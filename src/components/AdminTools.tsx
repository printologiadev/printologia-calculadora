'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, Database, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useUiStore } from '@/lib/stores';

interface TestResult {
    success: boolean;
    message: string;
    details?: string;
}

interface AdminToolsProps {
    position?: 'bottom-right' | 'top-right';
}

export default function AdminTools({ position = 'bottom-right' }: AdminToolsProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [testResult, setTestResult] = useState<TestResult | null>(null);
    const { isLoading, setLoading, setError, setSuccess } = useUiStore();

    const testSupabaseConnection = async () => {
        setTestResult(null);
        setLoading(true, 'Probando conexión con Supabase...');

        try {
            // Test 1: Verificar configuración
            const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
            const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

            if (!url || !key) {
                throw new Error('Variables de entorno no configuradas');
            }

            // Test 2: Intentar conexión básica
            const { data, error } = await supabase
                .from('blog_posts')
                .select('count', { count: 'exact', head: true });

            if (error) {
                throw new Error(`Error de conexión: ${error.message}`);
            }

            const result = {
                success: true,
                message: 'Conexión exitosa con Supabase',
                details: `Se pudo acceder a la tabla blog_posts. Total de registros: ${data || 0}`
            };

            setTestResult(result);
            setSuccess('Conexión verificada exitosamente');

        } catch (error: any) {
            const result = {
                success: false,
                message: 'Error en la conexión',
                details: error.message
            };

            setTestResult(result);
            setError('Error de conexión con Supabase', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Botón flotante */}
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
                className={`fixed z-50 bg-violet-600 hover:bg-violet-700 text-white p-4 rounded-full shadow-lg transition-colors ${
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
                                {/* Herramienta: Probar conexión Supabase */}
                                <div className="bg-zinc-800/50 rounded-xl p-4">
                                    <div className="flex items-center gap-3 mb-3">
                                        <Database className="w-5 h-5 text-blue-400" />
                                        <h4 className="font-medium text-white">Probar Conexión Supabase</h4>
                                    </div>

                                    <p className="text-sm text-zinc-400 mb-4">
                                        Verifica que la conexión con la base de datos funcione correctamente.
                                    </p>

                                    <button
                                        onClick={testSupabaseConnection}
                                        disabled={isLoading}
                                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Probando...
                                            </>
                                        ) : (
                                            <>
                                                <Database className="w-4 h-4" />
                                                Probar Conexión
                                            </>
                                        )}
                                    </button>

                                    {/* Resultado del test */}
                                    <AnimatePresence>
                                        {testResult && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className={`mt-4 p-3 rounded-lg border ${
                                                    testResult.success
                                                        ? 'bg-green-500/10 border-green-500/30 text-green-400'
                                                        : 'bg-red-500/10 border-red-500/30 text-red-400'
                                                }`}
                                            >
                                                <div className="flex items-center gap-2 mb-1">
                                                    {testResult.success ? (
                                                        <CheckCircle className="w-4 h-4" />
                                                    ) : (
                                                        <XCircle className="w-4 h-4" />
                                                    )}
                                                    <span className="font-medium text-sm">
                                                        {testResult.success ? 'Éxito' : 'Error'}
                                                    </span>
                                                </div>
                                                <p className="text-sm">{testResult.message}</p>
                                                {testResult.details && (
                                                    <p className="text-xs text-zinc-500 mt-1">{testResult.details}</p>
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

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