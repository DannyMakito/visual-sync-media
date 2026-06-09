"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { getDeadlineStatus, formatRelativeDate } from "@/lib/utils"
import { Calendar, CheckCircle2, AlertTriangle, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

export type DeadlineChipProps = {
    dueDate?: string
    status?: string
    completedAt?: number
    isAdmin?: boolean
    onSave?: (newDate: string | null) => Promise<void> | void
    className?: string
}

export function DeadlineChip({
    dueDate,
    status,
    completedAt,
    isAdmin,
    onSave,
    className,
}: DeadlineChipProps) {
    const [draftDate, setDraftDate] = useState(dueDate ?? "")
    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        setDraftDate(dueDate ?? "")
    }, [dueDate])

    const deadline = getDeadlineStatus(dueDate, status, completedAt)
    const showDate = dueDate ? formatRelativeDate(dueDate) : ""
    const label = dueDate ? `${deadline.label}${showDate ? ` • ${showDate}` : ""}` : deadline.label

    const badgeColor = {
        green: "bg-emerald-100 text-emerald-700 border-emerald-200",
        amber: "bg-amber-100 text-amber-700 border-amber-200",
        red: "bg-red-100 text-red-700 border-red-200",
        gray: "bg-slate-100 text-slate-700 border-slate-200",
    }[deadline.color]

    const handleSave = async () => {
        if (!onSave) return
        setIsSaving(true)
        setError(null)
        try {
            await onSave(draftDate || null)
        } catch (err) {
            setError("Unable to save deadline")
        } finally {
            setIsSaving(false)
        }
    }

    const handleClear = async () => {
        if (!onSave) return
        setIsSaving(true)
        setError(null)
        try {
            await onSave(null)
        } catch (err) {
            setError("Unable to remove deadline")
        } finally {
            setIsSaving(false)
        }
    }

    const trigger = (
        <Badge
            variant="outline"
            className={cn(
                "rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-widest whitespace-nowrap",
                badgeColor,
                className
            )}
        >
            <span className="flex items-center gap-1">
                {deadline.color === "green" && <CheckCircle2 className="h-3.5 w-3.5" />}
                {deadline.color === "amber" && <AlertTriangle className="h-3.5 w-3.5" />}
                {deadline.color === "red" && <AlertTriangle className="h-3.5 w-3.5" />}
                {deadline.color === "gray" && <Clock className="h-3.5 w-3.5" />}
                {label}
            </span>
        </Badge>
    )

    if (!isAdmin || !onSave) {
        return trigger
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <button type="button" className="outline-none">
                    {trigger}
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-[280px]">
                <div className="space-y-3">
                    <div className="space-y-1">
                        <Label className="text-xs font-semibold uppercase tracking-wider">Deadline</Label>
                        <Input
                            value={draftDate}
                            onChange={(event) => setDraftDate(event.target.value)}
                            type="date"
                            className="text-sm"
                        />
                    </div>
                    {error && <p className="text-xs text-red-500">{error}</p>}
                    <div className="flex items-center gap-2">
                        <Button
                            size="sm"
                            className="flex-1"
                            onClick={handleSave}
                            disabled={isSaving}
                        >
                            {dueDate ? "Update" : "Set"}
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={handleClear}
                            disabled={isSaving}
                        >
                            Clear
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
