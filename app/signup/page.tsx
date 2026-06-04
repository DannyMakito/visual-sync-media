"use client"

import { SignUp } from "@clerk/nextjs"
import Link from "next/link"

export default function SignupPage() {
    return (
        <main className="min-h-screen bg-white">
            <div className="flex min-h-screen">
                {/* Left Panel - Visual with Background Image */}
                <div
                    className="hidden lg:block w-1/2 fixed left-0 top-0 bottom-0 bg-black text-white"
                    style={{
                        backgroundImage: 'url(/images/banner.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/60"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-between p-12">
                        <div>
                            <Link href="/" className="font-display text-4xl text-vs-red hover:text-white transition-colors">
                                VSM
                            </Link>
                        </div>

                        <div>
                            <h3 className="font-display text-5xl uppercase mb-4">Join VisualSync</h3>
                            <p className="text-gray-300 max-w-md text-lg font-body">
                                Create an account to start booking services, managing projects, and accessing our premium creative platform.
                            </p>

                            <div className="mt-8 grid grid-cols-2 gap-4 max-w-sm">
                                <div className="border border-white/30 p-4 bg-black/50">
                                    <span className="block font-display text-3xl text-vs-red">200+</span>
                                    <span className="text-sm text-gray-400 font-body">Projects Delivered</span>
                                </div>
                                <div className="border border-white/30 p-4 bg-black/50">
                                    <span className="block font-display text-3xl text-vs-red">5+</span>
                                    <span className="text-sm text-gray-400 font-body">Years Experience</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Form */}
                <div className="w-full lg:w-1/2 lg:ml-auto flex items-center justify-center p-8 min-h-screen">
                    <div className="w-full max-w-md">
                        <div className="mb-10">
                            <Link href="/" className="font-display text-2xl hover:text-vs-red transition-colors">
                                ← Back
                            </Link>
                        </div>

                        <h1 className="font-display text-5xl md:text-6xl uppercase leading-none mb-4">
                            Create <span className="text-vs-red">Account</span>
                        </h1>
                        <p className="text-gray-600 mb-8 font-body">
                            Join VisualSync Media and start your creative journey.
                        </p>

                        <SignUp
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
                            fallbackRedirectUrl="/dashboard"
                            signInUrl="/login"
                        />

                        <div className="mt-8 text-center">
                            <p className="text-gray-600 font-body">
                                Already have an account?{' '}
                                <Link href="/login" className="text-vs-red font-bold hover:underline">
                                    Sign in
                                </Link>
                            </p>
                        </div>

                        <p className="mt-6 text-xs text-gray-500 text-center font-body">
                            By creating an account, you agree to our Terms of Service and Privacy Policy.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}
