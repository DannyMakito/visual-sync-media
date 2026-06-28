'use client';

import Link from 'next/link';

export const Hero = () => {
    const scrollToSection = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        } else {
            console.warn(`Element with id ${id} not found`);
        }
    };

    return (
        <>
            {/* 
        The "Obscure Navbar" / Header Block.
      */}
            <header className="relative w-full flex flex-col overflow-hidden border-b-4 border-black">

                {/* Layer 0: Background Image */}
                <div className="absolute inset-0 z-0">
                    <img src="/images/banner.png"
                        className="w-full h-full object-cover"
                        alt="Hero Model" />
                </div>

                {/* Layer 1: Glass Overlay */}
                <div className="absolute inset-0 z-10 backdrop-blur-[5px] bg-white/40"></div>

                {/* Layer 2: The Structure Grid */}
                <div className="relative z-30 flex flex-col w-full px-4 pt-4 md:px-6 md:pt-6">

                    {/* Top Row: HUGE MENU & Vertical JOIN List */}
                    <div className="flex justify-between items-start leading-none relative z-20">
                        <div className="cursor-pointer group">
                            <h1 className="font-display text-[18vw] leading-[0.75] tracking-tighter text-[#ff1a1a] group-hover:text-black transition-colors duration-300">
                                VSM
                            </h1>
                        </div>

                        <div className="flex flex-col items-end z-40 pt-1.5 md:pt-2 gap-y-2 md:gap-y-3">
                            {/* Auth Buttons */}
                            <div className="flex flex-col items-end gap-1">
                                <div className="flex gap-2 md:gap-3 mb-0.5">
                                    <Link
                                        href="/login"
                                        className="font-display text-[10px] md:text-sm uppercase tracking-wider text-black border border-black md:border-2 px-2.5 py-1.5 md:px-4 md:py-2 hover:bg-black hover:text-white transition-all duration-300"
                                    >
                                        Log In
                                    </Link>
                                    <Link
                                        href="/signup"
                                        className="font-display text-[10px] md:text-sm uppercase tracking-wider text-white bg-[#ff1a1a] border border-[#ff1a1a] md:border-2 px-2.5 py-1.5 md:px-4 md:py-2 hover:bg-black hover:border-black transition-all duration-300"
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                                <span className="font-mono text-[8px] md:text-[10px] text-black/70 max-w-[200px] md:max-w-[260px] text-right leading-tight uppercase tracking-wider">
                                    Need a video edit? Join our portal to upload media & track projects virtually.
                                </span>
                            </div>
                            
                            <Link
                                href="/contact"
                                className="font-display text-[11px] md:text-[1.5vw] lg:text-[2vw] leading-none tracking-tighter text-black hover:text-[#ff1a1a] transition-colors duration-300 text-right uppercase"
                            >
                                GET IN TOUCH
                            </Link>
                        </div>
                    </div>


                    {/* Bottom Row: Navigation Categories */}
                    <div className="relative z-50 flex justify-between items-center w-full mt-4 pt-3 pb-4 text-[10px] sm:text-xs md:text-sm uppercase tracking-wider gap-x-2">
                        <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className="cursor-pointer font-display hover:text-[#ff1a1a] transition-colors">
                            Projects
                        </a>
                        <Link href="/about" className="cursor-pointer font-display hover:text-[#ff1a1a] transition-colors">
                            About
                        </Link>
                        <Link href="/equipment" className="cursor-pointer font-display hover:text-[#ff1a1a] transition-colors">
                            Equipment
                        </Link>
                        <Link href="/contact" className="cursor-pointer font-display hover:text-[#ff1a1a] transition-colors">
                            Bundles
                        </Link>
                    </div>
                </div>
            </header>
        </>
    );
};
