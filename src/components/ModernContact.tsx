'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Send, Sparkles } from 'lucide-react';
import { contactSchema } from '@/lib/validations';
import { ContactFormData } from '@/types';
import emailjs from '@emailjs/browser';

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
            // Simplified email sending logic for the landing page contact form
            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                {
                    to_name: 'Printología',
                    from_name: data.name,
                    from_email: data.email,
                    phone: data.phone,
                    message: data.message,
                    html_content: `
            <h1>Nuevo Mensaje de Contacto</h1>
            <p><strong>Nombre:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Teléfono:</strong> ${data.phone}</p>
            <p><strong>Mensaje:</strong> ${data.message}</p>
          `
                },
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
            );

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
        <section id="contacto" className="py-24 px-6 bg-zinc-950 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-sky-900/10 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-violet-900/10 to-transparent pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                        Hablemos de tu Proyecto
                    </h2>
                    <p className="text-zinc-400 text-lg">
                        ¿Tienes una idea? Nosotros la hacemos realidad.
                    </p>
                </div>

                <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Name Input */}
                            <div className="relative group">
                                <input
                                    {...form.register('name')}
                                    type="text"
                                    placeholder=" "
                                    className="peer w-full bg-transparent border-b-2 border-zinc-700 py-3 text-white focus:border-sky-600 focus:outline-none transition-colors"
                                />
                                <label className="absolute left-0 top-3 text-zinc-500 transition-all peer-focus:-top-6 peer-focus:text-sm peer-focus:text-sky-600 peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-sky-600">
                                    Nombre Completo
                                </label>
                                {form.formState.errors.name && (
                                    <span className="text-red-500 text-sm mt-1 block">{form.formState.errors.name.message}</span>
                                )}
                            </div>

                            {/* Email Input */}
                            <div className="relative group">
                                <input
                                    {...form.register('email')}
                                    type="email"
                                    placeholder=" "
                                    className="peer w-full bg-transparent border-b-2 border-zinc-700 py-3 text-white focus:border-violet-600 focus:outline-none transition-colors"
                                />
                                <label className="absolute left-0 top-3 text-zinc-500 transition-all peer-focus:-top-6 peer-focus:text-sm peer-focus:text-violet-600 peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-violet-600">
                                    Correo Electrónico
                                </label>
                                {form.formState.errors.email && (
                                    <span className="text-red-500 text-sm mt-1 block">{form.formState.errors.email.message}</span>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Phone Input */}
                            <div className="relative group">
                                <input
                                    {...form.register('phone')}
                                    type="tel"
                                    placeholder=" "
                                    className="peer w-full bg-transparent border-b-2 border-zinc-700 py-3 text-white focus:border-amber-500 focus:outline-none transition-colors"
                                />
                                <label className="absolute left-0 top-3 text-zinc-500 transition-all peer-focus:-top-6 peer-focus:text-sm peer-focus:text-amber-500 peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-amber-500">
                                    Teléfono
                                </label>
                                {form.formState.errors.phone && (
                                    <span className="text-red-500 text-sm mt-1 block">{form.formState.errors.phone.message}</span>
                                )}
                            </div>

                            {/* Subject/Service (Optional or just a static text for now) */}
                            <div className="flex items-center text-zinc-500 italic">
                                * Nos pondremos en contacto contigo lo antes posible.
                            </div>
                        </div>

                        {/* Message Input */}
                        <div className="relative group">
                            <textarea
                                {...form.register('message')}
                                rows={4}
                                placeholder=" "
                                className="peer w-full bg-transparent border-b-2 border-zinc-700 py-3 text-white focus:border-emerald-600 focus:outline-none transition-colors resize-none"
                            />
                            <label className="absolute left-0 top-3 text-zinc-500 transition-all peer-focus:-top-6 peer-focus:text-sm peer-focus:text-emerald-600 peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-emerald-600">
                                Cuéntanos sobre tu proyecto
                            </label>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="relative group px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-sky-500 via-violet-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                                <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors">
                                    {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                                    {!isSubmitting && <Send className="w-4 h-4" />}
                                </span>
                            </button>
                        </div>

                        {/* Status Messages */}
                        {submitStatus === 'success' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 flex items-center gap-3"
                            >
                                <Sparkles className="w-5 h-5" />
                                <span>¡Mensaje enviado! Te contactaremos pronto.</span>
                            </motion.div>
                        )}

                        {submitStatus === 'error' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400"
                            >
                                Hubo un error al enviar el mensaje. Por favor intenta de nuevo.
                            </motion.div>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
}
