'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center relative overflow-hidden">
            {/* Animated background gradients */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-sky-600/10 rounded-full blur-[120px]"
                    animate={{
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-violet-600/10 rounded-full blur-[120px]"
                    animate={{
                        x: [0, -50, 0],
                        y: [0, -30, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <Link href="/" className="inline-block">
                        <Image
                            src="/LOGO_DARK.svg"
                            alt="Printología"
                            width={200}
                            height={50}
                            className="opacity-80 hover:opacity-100 transition-opacity"
                        />
                    </Link>
                </motion.div>

                {/* 404 Number */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-8"
                >
                    <h1 className="text-[150px] md:text-[200px] font-bold leading-none bg-gradient-to-r from-sky-500 via-violet-500 to-amber-500 bg-clip-text text-transparent">
                        404
                    </h1>
                </motion.div>

                {/* Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        ¡Ups! Página no encontrada
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        Parece que esta página se imprimió en otra dimensión. No te preocupes,
                        podemos ayudarte a encontrar lo que buscas.
                    </p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <Link
                        href="/"
                        className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-transform hover:scale-105 flex items-center gap-2"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-sky-500 via-violet-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors">
                            <Home className="w-5 h-5" />
                            Volver al Inicio
                        </span>
                    </Link>

                    <Link
                        href="/#servicios"
                        className="px-8 py-4 border-2 border-white/20 text-white font-bold rounded-full hover:border-sky-500 hover:text-sky-400 transition-all flex items-center gap-2"
                    >
                        <Search className="w-5 h-5" />
                        Ver Servicios
                    </Link>
                </motion.div>

                {/* Quick Links */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="mt-16 pt-8 border-t border-white/10"
                >
                    <p className="text-zinc-500 text-sm mb-4">Enlaces rápidos:</p>
                    <div className="flex flex-wrap gap-4 justify-center text-sm">
                        <Link href="/#servicios" className="text-zinc-400 hover:text-sky-400 transition-colors">
                            Servicios
                        </Link>
                        <Link href="/#portafolio" className="text-zinc-400 hover:text-sky-400 transition-colors">
                            Portafolio
                        </Link>
                        <Link href="/#contacto" className="text-zinc-400 hover:text-sky-400 transition-colors">
                            Contacto
                        </Link>
                        <Link href="/calculadora" className="text-zinc-400 hover:text-sky-400 transition-colors">
                            Cotizador
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
