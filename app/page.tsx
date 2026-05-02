"use client"

import { useEffect } from "react"

export default function RootPage() {
  // Middleware handles the redirect server-side:
  // - Signed in → /dashboard (or role-specific)
  // - Not signed in → /login
  // 
  // This page only renders if middleware somehow doesn't redirect.
  // Add a client-side fallback just in case.
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/login"
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-sm text-muted-foreground animate-pulse">Redirecting...</p>
      </div>
    </div>
  )
}
