import { query, mutation } from "./_generated/server"
import { v } from "convex/values"

// Create message
export const createMessage = mutation({
    args: {
        orderId: v.optional(v.id("orders")),
        projectId: v.optional(v.id("projects")),
        content: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()
        if (!identity) throw new Error("Not authenticated")

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
            .unique()

        if (!user) throw new Error("User not found")

        let isAuthorized = user.role === "admin"

        if (args.orderId) {
            const order = await ctx.db.get(args.orderId)
            if (!order) throw new Error("Order not found")
            if (order.clientId === user._id) isAuthorized = true
        } else if (args.projectId) {
            const project = await ctx.db.get(args.projectId)
            if (!project) throw new Error("Project not found")
            if (project.assigneeIds.some(id => id === user._id)) isAuthorized = true
        } else {
            throw new Error("Must specify orderId or projectId")
        }

        if (!isAuthorized) throw new Error("Not authorized")

        return await ctx.db.insert("messages", {
            orderId: args.orderId,
            projectId: args.projectId,
            senderId: user._id,
            content: args.content,
            createdAt: Date.now(),
        })
    },
})

// Get messages for an order
export const getOrderMessages = query({
    args: { orderId: v.id("orders") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()
        if (!identity) return []

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
            .unique()

        if (!user) return []

        const order = await ctx.db.get(args.orderId)
        if (!order) return []

        // Check authorization
        const isAuthorized =
            user.role === "admin" ||
            order.clientId === user._id

        if (!isAuthorized) return []

        const messages = await ctx.db
            .query("messages")
            .withIndex("by_orderId", (q) => q.eq("orderId", args.orderId))
            .collect()

        // Populate sender info
        return await Promise.all(
            messages.map(async (msg) => {
                const sender = await ctx.db.get(msg.senderId)
                return { ...msg, sender }
            })
        )
    },
})

// Get messages for a project
export const getProjectMessages = query({
    args: { projectId: v.id("projects") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()
        if (!identity) return []

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
            .unique()

        if (!user) return []

        const project = await ctx.db.get(args.projectId)
        if (!project) return []

        // Check authorization
        const isAuthorized =
            user.role === "admin" ||
            project.assigneeIds.some(id => id === user._id)

        if (!isAuthorized) return []

        const messages = await ctx.db
            .query("messages")
            .withIndex("by_projectId", (q) => q.eq("projectId", args.projectId))
            .collect()

        return await Promise.all(
            messages.map(async (msg) => {
                const sender = await ctx.db.get(msg.senderId)
                return { ...msg, sender }
            })
        )
    },
})

// Get all active conversations for Admin
export const getConversations = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity()
        if (!identity) return []

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
            .unique()

        if (!user || user.role !== "admin") return []

        // 1. Get all messages
        const allMessages = await ctx.db.query("messages").collect()
        
        // 2. Group by orderId or projectId to find active conversations
        const convos: Record<string, any> = {}

        for (const msg of allMessages) {
            const key = msg.orderId ? `order_${msg.orderId}` : `project_${msg.projectId}`
            if (!convos[key] || convos[key].lastMessageAt < msg.createdAt) {
                convos[key] = {
                    id: msg.orderId || msg.projectId,
                    type: msg.orderId ? "client" : "editor",
                    orderId: msg.orderId,
                    projectId: msg.projectId,
                    lastMessage: msg.content,
                    lastMessageAt: msg.createdAt,
                    lastSenderId: msg.senderId
                }
            }
        }

        // 3. Populate metadata (Client/Project info)
        const result = await Promise.all(
            Object.values(convos).map(async (c: any) => {
                let title = "Unknown"
                let subtitle = ""
                
                if (c.orderId) {
                    const order = await ctx.db.get(c.orderId)
                    const client = order ? await ctx.db.get(order.clientId) : null
                    title = client?.name || "Client"
                    subtitle = order?.title || "Order"
                } else if (c.projectId) {
                    const project = await ctx.db.get(c.projectId)
                    title = project?.title || "Project"
                    subtitle = "Internal Team"
                }
                
                const lastSender = await ctx.db.get(c.lastSenderId)

                return { ...c, title, subtitle, lastSender }
            })
        )

        return result.sort((a, b) => b.lastMessageAt - a.lastMessageAt)
    },
})

// Delete message
export const deleteMessage = mutation({
    args: { messageId: v.id("messages") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()
        if (!identity) throw new Error("Not authenticated")

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
            .unique()

        if (!user) throw new Error("User not found")

        const message = await ctx.db.get(args.messageId)
        if (!message) throw new Error("Message not found")

        if (message.senderId !== user._id && user.role !== "admin") {
            throw new Error("Not authorized")
        }

        await ctx.db.delete(args.messageId)
    },
})
