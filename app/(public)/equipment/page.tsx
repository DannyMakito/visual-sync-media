'use client';

import React from 'react';
import { Camera, Zap, Image as ImageIcon, Mic, Sliders, Share2 } from 'lucide-react';

export default function EquipmentPage() {
    return (
        <main className="w-full min-h-screen bg-vs-white text-vs-black">
            {/* Header Section */}
            <section className="relative w-full overflow-hidden border-b-4 border-vs-black pb-12 pt-24 md:pt-32 px-4 md:px-8">
                <div className="absolute inset-0 z-0">
                    <img src="/images/Bg Wall.jpeg" alt="Background" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black opacity-80"></div>
                </div>
                <div className="relative z-10 max-w-4xl text-white">
                    <h3 className="font-mono text-sm uppercase tracking-widest text-vs-red mb-4 flex items-center gap-2">
                        <Camera size={16} /> Technical Arsenal
                    </h3>
                    <h1 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase leading-[0.85] tracking-tight mb-8">
                        The Tools Behind <br/>
                        <span className="text-vs-red">The Vision</span>
                    </h1>
                    <p className="font-body text-sm md:text-lg text-white/70 max-w-2xl leading-relaxed">
                        Behind every great production is equipment you can rely on. At VisualSync Media, we invest in industry-leading cameras, professional audio solutions and studio lighting to ensure every project is captured with exceptional quality from start to finish.
                    </p>
                </div>
            </section>

            {/* Cameras Section - Main Focus */}
            <section id="cameras" className="relative w-full border-b-4 border-vs-black flex flex-col md:flex-row scroll-mt-20">
                <div className="w-full md:w-1/2 relative bg-black min-h-[400px] md:min-h-[600px] overflow-hidden group">
                    <img 
                        src="/images/mont-sony.jpg" 
                        alt="Sony FX3 Camera" 
                        className="w-full h-full object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-8 left-8 text-white z-10 pointer-events-none mix-blend-difference">
                        <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tighter">Cameras</h2>
                        <span className="font-mono text-xs uppercase tracking-widest opacity-70">Primary Cinema Cameras</span>
                    </div>
                </div>
                <div className="w-full md:w-1/2 relative p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-vs-white overflow-hidden">
                     <div className="absolute inset-0 z-0 opacity-40">
                        <img src="/images/bg wall white.jpeg" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="relative z-10 max-w-lg">
                        <div className="w-12 h-12 mb-8 bg-black flex items-center justify-center text-white">
                            <Camera size={24} />
                        </div>
                        <h3 className="font-display text-3xl md:text-5xl uppercase leading-[0.9] text-vs-black mb-4">
                            Sony FX3
                        </h3>
                        <p className="font-body text-base md:text-lg text-vs-black/70 leading-relaxed mb-6">
                            The Sony FX3 is a professional full-frame cinema camera designed for premium commercial productions, documentaries, interviews and cinematic brand content. Its exceptional low-light performance, stunning 4K image quality and advanced autofocus allow us to capture every moment with incredible detail.
                        </p>
                        
                        {/* Equipment List */}
                        <div className="p-6 border border-vs-black/20 bg-black/5">
                            <h4 className="font-mono text-xs uppercase tracking-widest text-vs-black mb-4">Inventory</h4>
                            <ul className="font-mono text-sm text-vs-black/80 space-y-2">
                                <li>• Sony FX3</li>
                                <li>• Sony A7 III / A7 IV</li>
                                <li>• Canon EOS R</li>
                                <li>• DJI Osmo Pocket</li>
                                <li>• GoPro HERO</li>
                                <li>• Smartphone Rig</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Additional Arsenal Section - Grid Layout */}
            <section className="w-full bg-vs-white p-8 md:p-12 lg:p-16 relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-40">
                    <img src="/images/bg wall white.jpeg" alt="" className="w-full h-full object-cover" />
                </div>
                
                <div className="relative z-10">
                    <div className="mb-12">
                        <h2 className="font-display text-4xl uppercase">Complete Toolkit</h2>
                        <p className="font-mono text-sm text-vs-black/50 uppercase tracking-widest mt-2">Everything else we bring to set</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        
                        {/* Lighting */}
                        <div id="lighting" className="border-2 border-vs-black bg-white p-8 scroll-mt-24 group hover:-translate-y-2 transition-transform">
                            <div className="w-10 h-10 mb-6 bg-vs-red flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                                <Zap size={20} />
                            </div>
                            <h3 className="font-display text-3xl uppercase mb-4">Lighting</h3>
                            <ul className="font-mono text-sm text-vs-black/70 space-y-2">
                                <li>• LED Panel Lights</li>
                                <li>• Softboxes</li>
                                <li>• Ring Light</li>
                                <li>• Light Stands</li>
                                <li>• Reflectors</li>
                                <li>• RGB LED Light</li>
                                <li>• Extension Cables</li>
                            </ul>
                        </div>

                        {/* Graphic */}
                        <div id="graphic" className="border-2 border-vs-black bg-black text-white p-8 scroll-mt-24 group hover:-translate-y-2 transition-transform">
                            <div className="w-10 h-10 mb-6 bg-white flex items-center justify-center text-black group-hover:scale-110 transition-transform">
                                <ImageIcon size={20} />
                            </div>
                            <h3 className="font-display text-3xl uppercase mb-4">Graphic</h3>
                            <ul className="font-mono text-sm text-white/70 space-y-2">
                                <li>• Editing PC</li>
                                <li>• Laptop Workstation</li>
                                <li>• Adobe Premiere Pro</li>
                                <li>• Adobe After Effects</li>
                                <li>• Adobe Photoshop</li>
                                <li>• Canva Pro</li>
                                <li>• External SSD Storage</li>
                            </ul>
                        </div>

                        {/* Audio */}
                        <div id="audio" className="border-2 border-vs-black bg-white p-8 scroll-mt-24 group hover:-translate-y-2 transition-transform">
                            <div className="w-10 h-10 mb-6 bg-vs-black flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                                <Mic size={20} />
                            </div>
                            <h3 className="font-display text-3xl uppercase mb-4">Audio</h3>
                            <ul className="font-mono text-sm text-vs-black/70 space-y-2">
                                <li>• Wireless Lavalier Microphones</li>
                                <li>• Shotgun Microphone</li>
                                <li>• Handheld Microphone</li>
                                <li>• Audio Recorder</li>
                                <li>• Boom Pole</li>
                                <li>• Headphones</li>
                            </ul>
                        </div>

                        {/* Filtering */}
                        <div id="filtering" className="border-2 border-vs-black bg-black text-white p-8 scroll-mt-24 group hover:-translate-y-2 transition-transform">
                            <div className="w-10 h-10 mb-6 bg-white flex items-center justify-center text-black group-hover:scale-110 transition-transform">
                                <Sliders size={20} />
                            </div>
                            <h3 className="font-display text-3xl uppercase mb-4">Filtering</h3>
                            <ul className="font-mono text-sm text-white/70 space-y-2">
                                <li>• Variable ND Filter</li>
                                <li>• UV Filter</li>
                                <li>• CPL (Polarizer) Filter</li>
                                <li>• Black Mist Filter</li>
                                <li>• Lens Cleaning Kit</li>
                            </ul>
                        </div>

                        {/* Posting */}
                        <div id="posting" className="border-2 border-vs-black bg-white p-8 scroll-mt-24 group hover:-translate-y-2 transition-transform">
                            <div className="w-10 h-10 mb-6 bg-vs-red flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                                <Share2 size={20} />
                            </div>
                            <h3 className="font-display text-3xl uppercase mb-4">Posting</h3>
                            <ul className="font-mono text-sm text-vs-black/70 space-y-2">
                                <li>• External SSD Drives</li>
                                <li>• SD Cards</li>
                                <li>• Card Reader</li>
                                <li>• Google Drive</li>
                                <li>• Dropbox</li>
                                <li>• YouTube Publishing</li>
                                <li>• Instagram & TikTok Publishing</li>
                            </ul>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    );
}
