"use client"

import { SignIn, useUser } from "@clerk/nextjs"
import { useEffect } from "react"

export default function LoginPage() {
    const { user, isLoaded } = useUser()

    // After OAuth callback (Gmail), the user is signed in client-side
    // but <SignIn> can't render for a signed-in user → black screen.
    // Detect this and redirect to dashboard.
    useEffect(() => {
        if (isLoaded && user) {
            window.location.href = "/dashboard"
        }
    }, [isLoaded, user])

    // User is signed in — show spinner while redirecting
    if (isLoaded && user) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-3">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                    <p className="text-sm text-muted-foreground animate-pulse">
                        Signing you in...
                    </p>
                </div>
            </div>
        )
    }

    // Clerk is still initializing
    if (!isLoaded) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-3">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                </div>
            </div>
        )
    }

    // User is not signed in — show Clerk SignIn
    return (
        <div className="flex h-screen w-full items-center justify-center bg-background">
            <SignIn 
                appearance={{
                    elements: {
                        rootBox: "mx-auto",
                        card: "shadow-lg",
                    }
                }}
                routing="hash"
                forceRedirectUrl="/dashboard"
                signUpUrl="/signup"
            />
        </div>
    )
}
