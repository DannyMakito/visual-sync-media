import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getInitials(name: string) {
    const parts = name.trim().split(/\s+/)
    if (parts.length === 0) return ""
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase()
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}
export function formatRelativeDate(dateStr: string) {
    if (!dateStr) return "N/A"
    try {
        const date = new Date(dateStr)
        const now = new Date()
        
        // Reset hours to compare dates only
        const d = new Date(date.getFullYear(), date.getMonth(), date.getDate())
        const n = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        
        const diffTime = d.getTime() - n.getTime()
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24))
        
        if (diffDays === 0) return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        if (diffDays === -1) return "Yesterday"
        
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    } catch (e) {
        return dateStr
    }
}

export function formatChatDate(dateStr: string) {
    if (!dateStr) return ""
    try {
        const date = new Date(dateStr)
        const now = new Date()
        
        const isToday = date.toDateString() === now.toDateString()
        
        const yesterday = new Date()
        yesterday.setDate(now.getDate() - 1)
        const isYesterday = date.toDateString() === yesterday.toDateString()
        
        if (isToday) return "Today"
        if (isYesterday) return "Yesterday"
        
        const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
        
        if (diffInDays < 7) {
            return date.toLocaleDateString('en-US', { weekday: 'long' })
        }
        
        return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
    } catch (e) {
        return dateStr
    }
}

export type DeadlineStatusKey =
    | "completedOnTime"
    | "completedLate"
    | "completedNoDeadline"
    | "onTrack"
    | "dueSoon"
    | "overdue"
    | "noDeadline"

export interface DeadlineStatus {
    key: DeadlineStatusKey
    label: string
    color: "green" | "amber" | "red" | "gray"
    daysLeft?: number
}

export function getDeadlineStatus(
    dueDate?: string,
    status?: string,
    completedAt?: number
): DeadlineStatus {
    if (!dueDate) {
        if (status === "done") {
            return {
                key: "completedNoDeadline",
                label: "Completed (No Deadline)",
                color: "gray",
            }
        }

        return {
            key: "noDeadline",
            label: "No Deadline",
            color: "gray",
        }
    }

    const dueDateMs = new Date(dueDate).getTime()
    const now = Date.now()
    const daysLeft = Math.ceil((dueDateMs - now) / (1000 * 60 * 60 * 24))

    if (status === "done") {
        if (completedAt) {
            if (completedAt <= dueDateMs) {
                return {
                    key: "completedOnTime",
                    label: "Completed On Time",
                    color: "green",
                    daysLeft,
                }
            }
            return {
                key: "completedLate",
                label: "Completed Late",
                color: "amber",
                daysLeft,
            }
        }

        return {
            key: dueDateMs >= now ? "completedOnTime" : "completedLate",
            label: dueDateMs >= now ? "Completed On Time" : "Completed Late",
            color: dueDateMs >= now ? "green" : "amber",
            daysLeft,
        }
    }

    if (daysLeft < 0) {
        return {
            key: "overdue",
            label: "Overdue",
            color: "red",
            daysLeft,
        }
    }

    if (daysLeft <= 2) {
        return {
            key: "dueSoon",
            label: "Due Soon",
            color: "amber",
            daysLeft,
        }
    }

    return {
        key: "onTrack",
        label: "On Track",
        color: "green",
        daysLeft,
    }
}
