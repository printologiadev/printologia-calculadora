'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const portfolioItems = [
    {
        id: 1,
        type: 'image',
        src: '/PUBLICACION_VERTICAL_REDES_PRINTOLOGIA.jpg',
        title: 'Campaña Redes',
        category: 'Social Media',
    },
    {
        id: 2,
        type: 'gradient',
        gradient: 'from-sky-600 to-blue-700',
        title: 'Branding Corporativo',
        category: 'Identidad Visual',
    },
    {
        id: 3,
        type: 'gradient',
        gradient: 'from-violet-600 to-indigo-700',
        title: 'Rotulación Vehicular',
        category: 'Gran Formato',
    },
    {
        id: 4,
        type: 'gradient',
        gradient: 'from-amber-500 to-orange-600',
        title: 'Señalética Industrial',
        category: 'Señalización',
    },
    {
        id: 5,
        type: 'gradient',
        gradient: 'from-emerald-500 to-green-600',
        title: 'Stickers Personalizados',
        category: 'Merchandising',
    },
    {
        id: 6,
        type: 'gradient',
        gradient: 'from-indigo-500 to-violet-600',
        title: 'Gigantografía',
        category: 'Exterior',
    },
];

export function PortfolioSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [direction, setDirection] = useState(0);

    const paginate = useCallback((newDirection: number) => {
        setDirection(newDirection);
        setCurrentIndex((prevIndex) => {
            let nextIndex = prevIndex + newDirection;
            if (nextIndex < 0) nextIndex = portfolioItems.length - 1;
            if (nextIndex >= portfolioItems.length) nextIndex = 0;
            return nextIndex;
        });
    }, []);

    useEffect(() => {
        if (isPaused) return;

        const timer = setInterval(() => {
            paginate(1);
        }, 5000);

        return () => clearInterval(timer);
    }, [isPaused, paginate]);

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8,
        }),
    };

    return (
        <section id="portafolio" className="py-24 bg-zinc-950 overflow-hidden relative">
            <div className="container mx-auto px-6">
                <div className="mb-16 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                        Trabajos Recientes
                    </h2>
                    <p className="text-zinc-400 text-lg">
                        Explora nuestra galería de proyectos destacados.
                    </p>
                </div>

                <div
                    className="relative h-[600px] w-full max-w-5xl mx-auto flex items-center justify-center"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 },
                                scale: { duration: 0.4 }
                            }}
                            className="absolute w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-zinc-900"
                        >
                            {portfolioItems[currentIndex].type === 'image' ? (
                                <Image
                                    src={portfolioItems[currentIndex].src!}
                                    alt={portfolioItems[currentIndex].title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            ) : (
                                <div className={`w-full h-full bg-gradient-to-br ${portfolioItems[currentIndex].gradient}`} />
                            )}

                            {/* Overlay Content */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-12">
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-white uppercase bg-sky-600 rounded-full">
                                        {portfolioItems[currentIndex].category}
                                    </span>
                                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-2">
                                        {portfolioItems[currentIndex].title}
                                    </h3>
                                </motion.div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <button
                        className="absolute left-4 z-10 p-4 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors border border-white/10"
                        onClick={() => paginate(-1)}
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        className="absolute right-4 z-10 p-4 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors border border-white/10"
                        onClick={() => paginate(1)}
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Indicators */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                        {portfolioItems.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setDirection(index > currentIndex ? 1 : -1);
                                    setCurrentIndex(index);
                                }}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'w-8 bg-white' : 'bg-white/50 hover:bg-white/80'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
