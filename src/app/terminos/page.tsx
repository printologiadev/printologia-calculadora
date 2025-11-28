'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, FileText, AlertCircle, CheckCircle, XCircle, Scale, Users } from 'lucide-react';

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-white/10 py-4">
                <div className="container mx-auto px-6 flex items-center justify-between">
                    <Link href="/">
                        <Image
                            src="/LOGO_DARK.svg"
                            alt="Printología"
                            width={160}
                            height={40}
                        />
                    </Link>
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Volver
                    </Link>
                </div>
            </header>

            {/* Hero Section */}
            <section className="pt-32 pb-16 px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-600/10 rounded-full blur-[120px]" />

                <div className="container mx-auto max-w-4xl relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-4 bg-violet-600/20 rounded-2xl border border-violet-600/30">
                            <FileText className="w-8 h-8 text-violet-400" />
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-2">
                                Términos de Servicio
                            </h1>
                            <p className="text-zinc-400">Última actualización: {new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="pb-24 px-6">
                <div className="container mx-auto max-w-4xl">
                    <div className="prose prose-invert prose-zinc max-w-none">

                        {/* Acceptance */}
                        <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-8">
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                <CheckCircle className="w-6 h-6 text-emerald-400" />
                                Aceptación de Términos
                            </h2>
                            <p className="text-zinc-300 leading-relaxed">
                                Al utilizar los servicios de Printología, aceptas estos términos y condiciones en su totalidad.
                                Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar nuestros servicios.
                            </p>
                        </div>

                        {/* Services */}
                        <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-8">
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                <Users className="w-6 h-6 text-sky-400" />
                                Servicios Ofrecidos
                            </h2>
                            <div className="text-zinc-300 space-y-3">
                                <p>Printología ofrece servicios de impresión de gran formato que incluyen:</p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Lonas publicitarias</li>
                                    <li>Vinilos decorativos y rotulación</li>
                                    <li>Impresión DTF para textiles</li>
                                    <li>Sublimación</li>
                                    <li>Stickers personalizados</li>
                                    <li>Otros servicios de gran formato</li>
                                </ul>
                                <p className="mt-4">
                                    Nos reservamos el derecho de modificar, suspender o descontinuar cualquier servicio en cualquier momento.
                                </p>
                            </div>
                        </div>

                        {/* Orders and Quotes */}
                        <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-8">
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                <FileText className="w-6 h-6 text-violet-400" />
                                Pedidos y Cotizaciones
                            </h2>
                            <div className="text-zinc-300 space-y-4">
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-2">Proceso de Cotización</h3>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>Las cotizaciones son válidas por 15 días calendario</li>
                                        <li>Los precios pueden variar según especificaciones finales del proyecto</li>
                                        <li>Se requiere aprobación del cliente antes de iniciar producción</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-2">Archivos y Diseños</h3>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>El cliente es responsable de proporcionar archivos en formato adecuado</li>
                                        <li>Printología puede ofrecer servicios de diseño con costo adicional</li>
                                        <li>Los archivos deben cumplir con especificaciones técnicas requeridas</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Payment */}
                        <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-8">
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                <Scale className="w-6 h-6 text-amber-400" />
                                Pagos y Facturación
                            </h2>
                            <div className="text-zinc-300 space-y-3">
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Se requiere anticipo del 50% para iniciar producción en proyectos nuevos</li>
                                    <li>El saldo restante debe liquidarse antes de la entrega</li>
                                    <li>Aceptamos transferencias bancarias, efectivo y otros métodos acordados</li>
                                    <li>Las facturas se emiten según requerimientos fiscales vigentes</li>
                                    <li>Los pagos atrasados pueden generar intereses moratorios</li>
                                </ul>
                            </div>
                        </div>

                        {/* Delivery */}
                        <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-8">
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                <CheckCircle className="w-6 h-6 text-emerald-400" />
                                Tiempos de Entrega
                            </h2>
                            <div className="text-zinc-300 space-y-3">
                                <p>Los tiempos de entrega son estimados y pueden variar según:</p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Complejidad del proyecto</li>
                                    <li>Disponibilidad de materiales</li>
                                    <li>Carga de trabajo actual</li>
                                    <li>Aprobaciones y cambios del cliente</li>
                                </ul>
                                <p className="mt-4">
                                    Printología se esfuerza por cumplir con los plazos acordados, pero no se hace responsable por retrasos
                                    causados por factores fuera de nuestro control.
                                </p>
                            </div>
                        </div>

                        {/* Quality and Returns */}
                        <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-8">
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                <AlertCircle className="w-6 h-6 text-orange-400" />
                                Calidad y Devoluciones
                            </h2>
                            <div className="text-zinc-300 space-y-4">
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-2">Garantía de Calidad</h3>
                                    <p>Garantizamos la calidad de nuestros productos según especificaciones acordadas.
                                        Cualquier defecto de fabricación será corregido sin costo adicional.</p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-2">Devoluciones</h3>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>No se aceptan devoluciones de productos personalizados</li>
                                        <li>Reclamos por defectos deben hacerse dentro de 48 horas de la entrega</li>
                                        <li>El cliente debe inspeccionar el producto al momento de la entrega</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Limitations */}
                        <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-8">
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                <XCircle className="w-6 h-6 text-red-400" />
                                Limitaciones de Responsabilidad
                            </h2>
                            <div className="text-zinc-300 space-y-3">
                                <p>Printología no será responsable por:</p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Errores en archivos proporcionados por el cliente</li>
                                    <li>Variaciones de color inherentes al proceso de impresión</li>
                                    <li>Daños causados durante instalación por terceros</li>
                                    <li>Pérdidas indirectas o consecuenciales</li>
                                    <li>Uso inadecuado de los productos entregados</li>
                                </ul>
                            </div>
                        </div>

                        {/* Contact */}
                        <div className="bg-gradient-to-br from-violet-900/20 to-amber-900/20 backdrop-blur-xl border border-violet-500/30 rounded-3xl p-8">
                            <h2 className="text-2xl font-bold mb-4">Contacto</h2>
                            <p className="text-zinc-300 mb-4">
                                Para preguntas sobre estos términos de servicio, contáctanos:
                            </p>
                            <div className="space-y-2 text-zinc-300">
                                <p><strong className="text-white">WhatsApp:</strong> <a href="https://wa.me/528143603610" className="text-violet-400 hover:text-violet-300">+52 814 360 3610</a></p>
                                <p><strong className="text-white">Ubicación:</strong> Monterrey, Nuevo León, México</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}
