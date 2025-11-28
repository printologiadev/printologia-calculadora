'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const { clientX, clientY } = e;
            const x = clientX / window.innerWidth;
            const y = clientY / window.innerHeight;

            containerRef.current.style.setProperty('--mouse-x', `${x}`);
            containerRef.current.style.setProperty('--mouse-y', `${y}`);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
            style={{
                '--mouse-x': '0.5',
                '--mouse-y': '0.5',
            } as React.CSSProperties}
        >
            {/* Aurora Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-sky-600/20 rounded-full blur-[120px] animate-pulse mix-blend-screen"
                    style={{ transform: 'translate(calc(var(--mouse-x) * -50px), calc(var(--mouse-y) * -50px))' }} />
                <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-violet-600/20 rounded-full blur-[120px] animate-pulse delay-75 mix-blend-screen"
                    style={{ transform: 'translate(calc(var(--mouse-x) * 50px), calc(var(--mouse-y) * 50px))' }} />
                <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] bg-amber-600/20 rounded-full blur-[120px] animate-pulse delay-150 mix-blend-screen"
                    style={{ transform: 'translate(calc(var(--mouse-x) * 30px), calc(var(--mouse-y) * -30px))' }} />
            </div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

            <div className="relative z-10 container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-8"
                >
                    <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6">
                        <span className="text-sm font-medium text-sky-400 tracking-wider uppercase">
                            Impresión Gran Formato
                        </span>
                    </div>

                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none font-mono">
                        <span className="block text-white">IMPRIMIMOS</span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-violet-500 to-amber-500 animate-gradient-x">
                            TUS IDEAS
                        </span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-xl md:text-2xl text-zinc-400 font-light leading-relaxed">
                        Lonas, Vinilos, DTF y más. Calidad premium con tecnología de vanguardia en Monterrey.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
                        <Link
                            href="/calculadora"
                            className="group relative px-8 py-4 bg-white text-black font-bold text-lg rounded-full overflow-hidden transition-transform hover:scale-105"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-sky-500 via-violet-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors">
                                Cotizar Ahora <ArrowRight className="w-5 h-5" />
                            </span>
                        </Link>

                        <Link
                            href="#portafolio"
                            className="px-8 py-4 text-white font-medium text-lg hover:text-sky-400 transition-colors"
                        >
                            Ver Portafolio
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-2">
                    <div className="w-1 h-2 bg-white/50 rounded-full" />
                </div>
            </motion.div>
        </section>
    );
}
