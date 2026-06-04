"use client"

import { SignIn, useUser } from "@clerk/nextjs"
import { useEffect } from "react"
import Link from "next/link"

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
            <div className="flex h-screen w-full items-center justify-center bg-white">
                <div className="flex flex-col items-center gap-3">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-vs-red border-t-transparent" />
                    <p className="text-sm text-gray-500 animate-pulse font-body">
                        Signing you in...
                    </p>
                </div>
            </div>
        )
    }

    // Clerk is still initializing
    if (!isLoaded) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-white">
                <div className="flex flex-col items-center gap-3">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-vs-red border-t-transparent" />
                </div>
            </div>
        )
    }

    // User is not signed in — show Clerk SignIn with split-panel layout
    return (
        <main className="min-h-screen bg-white flex">
            {/* Left Panel - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <div className="mb-10">
                        <Link href="/" className="font-display text-2xl hover:text-vs-red transition-colors">
                            ← Back
                        </Link>
                    </div>

                    <h1 className="font-display text-5xl md:text-6xl uppercase leading-none mb-4">
                        Sign <span className="text-vs-red">In</span>
                    </h1>
                    <p className="text-gray-600 mb-8 font-body">
                        Welcome back. Sign in to access your dashboard.
                    </p>

                    <SignIn
                        appearance={{
                            elements: {
                                rootBox: "w-full",
                                card: "shadow-none border-0 p-0 w-full bg-transparent",
                                cardBox: "shadow-none border-0 w-full",
                                header: "hidden",
                                footer: "hidden",
                                formButtonPrimary:
                                    "bg-black text-white uppercase tracking-widest font-bold hover:bg-[#ff1a1a] transition-colors border-0 rounded-none h-14 text-sm",
                                formFieldInput:
                                    "border-4 border-black rounded-none focus:border-[#ff1a1a] focus:ring-0 font-body h-14",
                                formFieldLabel:
                                    "text-sm font-bold uppercase tracking-widest",
                                socialButtonsBlockButton:
                                    "border-4 border-black rounded-none hover:bg-gray-100 transition-colors h-14 font-bold uppercase tracking-wider text-sm",
                                socialButtonsBlockButtonText:
                                    "font-bold uppercase tracking-wider text-sm",
                                dividerLine: "bg-black/20",
                                dividerText: "text-gray-500 uppercase text-xs tracking-widest",
                                identityPreview: "border-4 border-black rounded-none",
                                formFieldAction: "text-[#ff1a1a] hover:text-black font-bold",
                                otpCodeFieldInput: "border-4 border-black rounded-none",
                                alert: "border-4 border-red-500 rounded-none",
                            },
                        }}
                        routing="hash"
                        forceRedirectUrl="/dashboard"
                        signUpUrl="/signup"
                    />

                    <div className="mt-8 text-center">
                        <p className="text-gray-600 font-body">
                            Don&apos;t have an account?{' '}
                            <Link href="/signup" className="text-vs-red font-bold hover:underline">
                                Create one
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Panel - Visual */}
            <div className="hidden lg:block lg:w-1/2 bg-black text-white relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="font-display text-[15vw] leading-none text-vs-red opacity-20">
                            VS
                        </h2>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-12">
                    <h3 className="font-display text-4xl uppercase mb-4">Welcome Back</h3>
                    <p className="text-gray-400 max-w-md font-body">
                        Access your projects, track progress, and manage your creative workflow all in one place.
                    </p>
                </div>
            </div>
        </main>
    )
}
