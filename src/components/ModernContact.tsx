'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { contactSchema } from '@/lib/validations';
import { ContactFormData } from '@/types';

export function ModernContact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const form = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            message: ''
        }
    });

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Error al enviar el mensaje');
            }

            setSubmitStatus('success');
            form.reset();
        } catch (error) {
            console.error('Error sending email:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contacto" className="py-20 px-6 bg-zinc-950">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Hablemos de tu proyecto
                    </h2>
                    <p className="text-zinc-400 text-lg">
                        Cuéntanos qué necesitas y te ayudamos a hacerlo realidad
                    </p>
                </div>

                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-8"
                >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Name */}
                        <div>
                            <input
                                {...form.register('name')}
                                type="text"
                                placeholder="Tu nombre"
                                autoComplete="name"
                                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:outline-none transition-colors"
                            />
                            {form.formState.errors.name && (
                                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                                    <AlertCircle className="w-4 h-4" />
                                    {form.formState.errors.name.message}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <input
                                {...form.register('email')}
                                type="email"
                                placeholder="tu@email.com"
                                autoComplete="email"
                                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 focus:outline-none transition-colors"
                            />
                            {form.formState.errors.email && (
                                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                                    <AlertCircle className="w-4 h-4" />
                                    {form.formState.errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Phone (Optional) */}
                        <div>
                            <input
                                {...form.register('phone')}
                                type="tel"
                                placeholder="Teléfono (opcional)"
                                autoComplete="tel"
                                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none transition-colors"
                            />
                            {form.formState.errors.phone && (
                                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                                    <AlertCircle className="w-4 h-4" />
                                    {form.formState.errors.phone.message}
                                </p>
                            )}
                        </div>

                        {/* Message */}
                        <div>
                            <textarea
                                {...form.register('message')}
                                rows={4}
                                placeholder="Cuéntanos sobre tu proyecto..."
                                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-colors resize-none"
                            />
                            {form.formState.errors.message && (
                                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                                    <AlertCircle className="w-4 h-4" />
                                    {form.formState.errors.message.message}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3 px-6 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Enviando...
                                </>
                            ) : (
                                <>
                                    <Send className="w-4 h-4" />
                                    Enviar mensaje
                                </>
                            )}
                        </button>

                        {/* Status Messages */}
                        {submitStatus === 'success' && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3"
                            >
                                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                                <div>
                                    <p className="text-green-400 font-medium">¡Mensaje enviado!</p>
                                    <p className="text-green-300/80 text-sm">Te contactaremos pronto.</p>
                                </div>
                            </motion.div>
                        )}

                        {submitStatus === 'error' && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3"
                            >
                                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                                <div>
                                    <p className="text-red-400 font-medium">Error al enviar</p>
                                    <p className="text-red-300/80 text-sm">Inténtalo de nuevo.</p>
                                </div>
                            </motion.div>
                        )}
                    </form>
                </motion.div>

                {/* Contact Info */}
                <div className="mt-12 text-center">
                    <p className="text-zinc-500 mb-4">O contactanos directamente:</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="tel:+528143603610"
                            className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-300 hover:text-white transition-colors flex items-center justify-center gap-2"
                        >
                            📞 +52 814 360 3610
                        </a>
                        <a
                            href="mailto:contacto@printologia.com.mx"
                            className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-300 hover:text-white transition-colors flex items-center justify-center gap-2"
                        >
                            ✉️ contacto@printologia.com.mx
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
