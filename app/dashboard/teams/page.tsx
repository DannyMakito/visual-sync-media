"use client"

import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Briefcase, MessageSquare, Zap } from "lucide-react"

export default function TeamsPage() {
    const editorStats = useQuery(api.admin.getEditorStats) || []

    return (
        <div className="flex-1 space-y-6 w-full max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Team Overview</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Real-time workload and activity for your editorial team.
                    </p>
                </div>
                <Badge variant="outline" className="text-xs">
                    {editorStats.length} editor{editorStats.length !== 1 ? "s" : ""}
                </Badge>
            </div>

            {editorStats.length === 0 ? (
                <div className="p-16 text-center border-2 border-dashed rounded-2xl opacity-50">
                    <p className="font-medium">No editors found in the system.</p>
                    <p className="text-sm text-muted-foreground mt-1">Add editors from the Users page to see their stats here.</p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {editorStats.map((editor: any) => (
                        <TeamMemberCard key={editor.editorId} editor={editor} />
                    ))}
                </div>
            )}
        </div>
    )
}

function TeamMemberCard({ editor }: { editor: any }) {
    const workload = editor.workload ?? 0

    let barColor = "bg-green-500"
    if (workload > 90) barColor = "bg-red-500"
    else if (workload > 60) barColor = "bg-amber-500"

    const isActive = editor.activeProjectCount > 0

    return (
        <Card className="rounded-2xl border bg-card shadow-sm hover:shadow-md transition-all">
            <CardContent className="p-6 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Avatar className="h-12 w-12 border-2 border-background">
                                <AvatarImage src={editor.image || ""} />
                                <AvatarFallback className="font-bold text-sm">
                                    {editor.name?.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase() || "?"}
                                </AvatarFallback>
                            </Avatar>
                            <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card ${isActive ? "bg-amber-400" : "bg-green-500"}`} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-base leading-tight">{editor.name}</h3>
                            <p className="text-xs text-muted-foreground mt-0.5">
                                {editor.specialties?.length > 0 ? editor.specialties.join(", ") : "Editor"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Project Count */}
                <div className="flex items-center justify-between text-xs text-muted-foreground border rounded-xl px-3 py-2 bg-muted/30">
                    <div className="flex items-center gap-1.5">
                        <Briefcase className="h-3.5 w-3.5" />
                        <span><strong className="text-foreground">{editor.activeProjectCount}</strong> active</span>
                    </div>
                    <div className="text-muted-foreground/60">·</div>
                    <div>
                        <strong className="text-foreground">{editor.projectCount}</strong> total projects
                    </div>
                </div>

                {/* Workload Bar */}
                <div>
                    <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-muted-foreground flex items-center gap-1">
                            <Zap className="h-3 w-3" /> Workload
                        </span>
                        <span className="font-semibold">{workload}%</span>
                    </div>
                    <Progress value={workload} className="h-2" />
                    <p className="text-[10px] text-muted-foreground mt-1">
                        Based on {editor.activeProjectCount} active project{editor.activeProjectCount !== 1 ? "s" : ""}
                        {" "}(max 5 = 100%)
                    </p>
                </div>

                {/* Current Task */}
                <div className="text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground uppercase tracking-wider text-[10px]">Status</span>
                    <p className="mt-0.5 font-medium text-sm text-foreground">{editor.currentTask}</p>
                </div>

                {/* Latest Message */}
                <div className="bg-muted/50 rounded-xl p-3 space-y-1">
                    <div className="flex items-center gap-1.5">
                        <MessageSquare className="h-3 w-3 text-primary" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                            Latest Project Message
                        </span>
                    </div>
                    <p className="text-sm font-medium leading-snug line-clamp-2">{editor.latestMessage}</p>
                    <p className="text-xs text-muted-foreground">
                        on <span className="text-foreground font-medium">{editor.latestProject}</span>
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
