'use client';

import { motion } from 'framer-motion';
import { Printer, Sticker, Shirt, Image as ImageIcon, Layers, Maximize } from 'lucide-react';
import Link from 'next/link';

const services = [
    {
        id: 'lonas',
        title: 'Lonas Publicitarias',
        description: 'Impresión de gran impacto para exteriores e interiores.',
        icon: Layers,
        color: 'from-sky-600 to-blue-700',
        span: 'md:col-span-2 md:row-span-2',
        delay: 0.1,
    },
    {
        id: 'vinilos',
        title: 'Vinilos',
        description: 'Decoración y rotulación vehicular de alta precisión.',
        icon: Sticker,
        color: 'from-violet-600 to-purple-700',
        span: 'md:col-span-1 md:row-span-1',
        delay: 0.2,
    },
    {
        id: 'dtf',
        title: 'DTF Textil',
        description: 'Personalización de prendas con acabado premium.',
        icon: Shirt,
        color: 'from-amber-500 to-orange-600',
        span: 'md:col-span-1 md:row-span-2',
        delay: 0.3,
    },
    {
        id: 'sublimacion',
        title: 'Sublimación',
        description: 'Colores vibrantes en textiles y promocionales.',
        icon: Printer,
        color: 'from-rose-500 to-red-600',
        span: 'md:col-span-1 md:row-span-1',
        delay: 0.4,
    },
    {
        id: 'stickers',
        title: 'Stickers',
        description: 'Etiquetas personalizadas en cualquier forma.',
        icon: ImageIcon,
        color: 'from-emerald-500 to-green-600',
        span: 'md:col-span-2 md:row-span-1',
        delay: 0.5,
    },
    {
        id: 'gran-formato',
        title: 'Gran Formato',
        description: 'Proyectos gigantes de hasta 3.20m de ancho.',
        icon: Maximize,
        color: 'from-indigo-600 to-blue-800',
        span: 'md:col-span-2 md:row-span-1',
        delay: 0.6,
    },
];

export function BentoGrid() {
    return (
        <section id="servicios" className="py-24 px-6 bg-background relative overflow-hidden">
            <div className="w-full md:w-[70%] mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
                            Nuestros Servicios
                        </span>
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        Soluciones de impresión creativa diseñadas para destacar tu marca.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
                    {services.map((service) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: service.delay, duration: 0.5 }}
                            className={`group relative overflow-hidden rounded-3xl bg-zinc-900/50 border border-white/5 p-6 hover:border-white/10 transition-colors ${service.span}`}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <div className={`p-3 rounded-2xl bg-white/5 text-white group-hover:bg-white/10 transition-colors`}>
                                        <service.icon className="w-6 h-6" />
                                    </div>
                                    <Link
                                        href="/calculadora"
                                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs font-medium bg-white text-black px-3 py-1.5 rounded-full"
                                    >
                                        Cotizar
                                    </Link>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:translate-x-1 transition-transform">
                                        {service.title}
                                    </h3>
                                    <p className="text-zinc-400 text-sm group-hover:text-zinc-300 transition-colors">
                                        {service.description}
                                    </p>
                                </div>
                            </div>

                            {/* Hover Effect - Glow */}
                            <div
                                className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
