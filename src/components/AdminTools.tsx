'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, Loader2 } from 'lucide-react';
import { useUiStore } from '@/lib/stores';

interface AdminToolsProps {
    position?: 'bottom-right' | 'top-right';
}

export default function AdminTools({ position = 'bottom-right' }: AdminToolsProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { isLoading, setLoading, setError, setSuccess } = useUiStore();


    return (
        <>
            {/* Botón flotante */}
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
                className={`hidden fixed z-50 bg-violet-600 hover:bg-violet-700 text-white p-4 rounded-full shadow-lg transition-colors ${
                    position === 'top-right' ? 'top-6 right-6' : 'bottom-6 right-6'
                }`}
            >
                <Wrench className="w-6 h-6" />
            </motion.button>

            {/* Modal de herramientas */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/50 z-40"
                        />

                        {/* Panel de herramientas */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className={`fixed z-50 w-96 bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl ${
                                position === 'top-right' ? 'top-24 right-6' : 'bottom-24 right-6'
                            }`}
                        >
                            {/* Header */}
                            <div className="p-6 border-b border-white/10">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Wrench className="w-6 h-6 text-violet-400" />
                                        <h3 className="text-lg font-bold text-white">Herramientas de Admin</h3>
                                    </div>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="text-zinc-400 hover:text-white transition-colors"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>

                            {/* Contenido */}
                            <div className="p-6 space-y-4">

                                {/* Espacio para futuras herramientas */}
                                <div className="bg-zinc-800/50 rounded-xl p-4 opacity-50">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-5 h-5 bg-zinc-600 rounded"></div>
                                        <h4 className="font-medium text-zinc-500">Próximas herramientas...</h4>
                                    </div>
                                    <p className="text-sm text-zinc-600">
                                        Más herramientas próximamente
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}