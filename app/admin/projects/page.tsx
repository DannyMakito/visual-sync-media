"use client"

import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { FolderKanban } from "lucide-react"

export default function AdminProjectsPage() {
    const projects = useQuery(api.projects.getEditorProjects)

    if (projects === undefined) {
        return <div className="text-center py-8">Loading projects...</div>
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
                <p className="text-muted-foreground">Manage and monitor all projects</p>
            </div>

            {projects.length > 0 ? (
                <div className="grid gap-4">
                    {projects.map((project: any) => (
                        <Card key={project._id}>
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="text-lg">{project.title}</CardTitle>
                                        <CardDescription>{project.client?.name || "Unknown Client"}</CardDescription>
                                    </div>
                                    <Badge variant={project.status === "done" ? "default" : project.status === "in-progress" ? "secondary" : "outline"} className="capitalize">
                                        {project.status.replace(/-/g, " ")}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Progress</span>
                                        <span className="font-medium">{project.progress}%</span>
                                    </div>
                                    <Progress value={project.progress} className="h-2" />
                                    <div className="flex justify-between items-center text-xs text-muted-foreground mt-2">
                                        <span>Status: {project.statusLine}</span>
                                        {project.dueDate && <span>Due: {project.dueDate}</span>}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <FolderKanban className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No Projects Found</h3>
                        <p className="text-muted-foreground text-center">
                            There are currently no projects in the system.
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
