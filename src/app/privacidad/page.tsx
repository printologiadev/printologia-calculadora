'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Shield, Lock, Eye, Database, UserCheck, Mail } from 'lucide-react';

export default function PrivacyPolicy() {
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
                <div className="absolute top-0 left-0 w-96 h-96 bg-sky-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px]" />

                <div className="container mx-auto max-w-4xl relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-4 bg-sky-600/20 rounded-2xl border border-sky-600/30">
                            <Shield className="w-8 h-8 text-sky-400" />
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-2">
                                Política de Privacidad
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

                        {/* Introduction */}
                        <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-8">
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                <Lock className="w-6 h-6 text-sky-400" />
                                Introducción
                            </h2>
                            <p className="text-zinc-300 leading-relaxed">
                                En Printología, nos comprometemos a proteger tu privacidad y datos personales. Esta política describe cómo recopilamos,
                                usamos y protegemos tu información cuando utilizas nuestros servicios de impresión de gran formato.
                            </p>
                        </div>

                        {/* Information We Collect */}
                        <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-8">
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                <Database className="w-6 h-6 text-violet-400" />
                                Información que Recopilamos
                            </h2>
                            <div className="space-y-4 text-zinc-300">
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-2">Información Personal</h3>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>Nombre completo</li>
                                        <li>Correo electrónico</li>
                                        <li>Número de teléfono</li>
                                        <li>Dirección de entrega (cuando aplique)</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-2">Información del Proyecto</h3>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>Detalles de cotizaciones y pedidos</li>
                                        <li>Archivos de diseño subidos</li>
                                        <li>Especificaciones técnicas del proyecto</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* How We Use Your Information */}
                        <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-8">
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                <Eye className="w-6 h-6 text-amber-400" />
                                Cómo Usamos tu Información
                            </h2>
                            <div className="text-zinc-300 space-y-3">
                                <p>Utilizamos tu información personal para:</p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Procesar tus cotizaciones y pedidos</li>
                                    <li>Comunicarnos contigo sobre el estado de tus proyectos</li>
                                    <li>Mejorar nuestros servicios y experiencia del cliente</li>
                                    <li>Enviar actualizaciones sobre nuevos servicios (con tu consentimiento)</li>
                                    <li>Cumplir con obligaciones legales y fiscales</li>
                                </ul>
                            </div>
                        </div>

                        {/* Data Protection */}
                        <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-8">
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                <UserCheck className="w-6 h-6 text-emerald-400" />
                                Protección de Datos
                            </h2>
                            <div className="text-zinc-300 space-y-3">
                                <p>Implementamos medidas de seguridad técnicas y organizativas para proteger tus datos:</p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Encriptación SSL/TLS para todas las comunicaciones</li>
                                    <li>Almacenamiento seguro en servidores protegidos</li>
                                    <li>Acceso limitado solo a personal autorizado</li>
                                    <li>Copias de seguridad regulares</li>
                                    <li>Cumplimiento con la Ley Federal de Protección de Datos Personales (México)</li>
                                </ul>
                            </div>
                        </div>

                        {/* Your Rights */}
                        <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-8">
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                <Shield className="w-6 h-6 text-indigo-400" />
                                Tus Derechos
                            </h2>
                            <div className="text-zinc-300 space-y-3">
                                <p>Tienes derecho a:</p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li><strong>Acceso:</strong> Solicitar una copia de tus datos personales</li>
                                    <li><strong>Rectificación:</strong> Corregir datos inexactos o incompletos</li>
                                    <li><strong>Cancelación:</strong> Solicitar la eliminación de tus datos</li>
                                    <li><strong>Oposición:</strong> Oponerte al procesamiento de tus datos para ciertos fines</li>
                                    <li><strong>Portabilidad:</strong> Recibir tus datos en un formato estructurado</li>
                                </ul>
                            </div>
                        </div>

                        {/* Contact */}
                        <div className="bg-gradient-to-br from-sky-900/20 to-violet-900/20 backdrop-blur-xl border border-sky-500/30 rounded-3xl p-8">
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                <Mail className="w-6 h-6 text-sky-400" />
                                Contacto
                            </h2>
                            <p className="text-zinc-300 mb-4">
                                Para ejercer tus derechos o si tienes preguntas sobre esta política de privacidad, contáctanos:
                            </p>
                            <div className="space-y-2 text-zinc-300">
                                <p><strong className="text-white">WhatsApp:</strong> <a href="https://wa.me/528143603610" className="text-sky-400 hover:text-sky-300">+52 814 360 3610</a></p>
                                <p><strong className="text-white">Ubicación:</strong> Monterrey, Nuevo León, México</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}
