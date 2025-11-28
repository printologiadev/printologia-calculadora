'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const portfolioItems = [
    {
        id: 1,
        type: 'image',
        src: '/PUBLICACION_VERTICAL_REDES_PRINTOLOGIA.jpg',
        title: 'Campaña Redes',
    },
    {
        id: 2,
        type: 'gradient',
        gradient: 'from-sky-600 to-blue-700',
        title: 'Branding Corporativo',
    },
    {
        id: 3,
        type: 'gradient',
        gradient: 'from-violet-600 to-indigo-700',
        title: 'Rotulación Vehicular',
    },
    {
        id: 4,
        type: 'gradient',
        gradient: 'from-amber-500 to-orange-600',
        title: 'Señalética Industrial',
    },
    {
        id: 5,
        type: 'gradient',
        gradient: 'from-emerald-500 to-green-600',
        title: 'Stickers Personalizados',
    },
    {
        id: 6,
        type: 'gradient',
        gradient: 'from-indigo-500 to-violet-600',
        title: 'Gigantografía',
    },
];

export function PortfolioMarquee() {
    return (
        <section id="portafolio" className="py-24 bg-zinc-950 overflow-hidden">
            <div className="mb-16 text-center px-6">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                    Trabajos Recientes
                </h2>
                <p className="text-zinc-400">
                    Calidad que habla por sí misma.
                </p>
            </div>

            <div className="relative flex w-full overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-zinc-950 to-transparent z-10" />
                <div className="absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-zinc-950 to-transparent z-10" />

                <motion.div
                    className="flex gap-8 py-4"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 30,
                            ease: "linear",
                        },
                    }}
                    style={{ width: "max-content" }}
                >
                    {[...portfolioItems, ...portfolioItems].map((item, index) => (
                        <div
                            key={`${item.id}-${index}`}
                            className="relative group w-[300px] h-[400px] md:w-[400px] md:h-[500px] flex-shrink-0 rounded-3xl overflow-hidden cursor-pointer"
                        >
                            {item.type === 'image' ? (
                                <Image
                                    src={item.src!}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            ) : (
                                <div className={`w-full h-full bg-gradient-to-br ${item.gradient} transition-transform duration-500 group-hover:scale-110`} />
                            )}

                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                                <h3 className="text-white text-2xl font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    {item.title}
                                </h3>
                                <p className="text-sky-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                    Ver Proyecto
                                </p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
