'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Eye, EyeOff, TrendingUp, Clock, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { useBlogStore, useUiStore } from '@/lib/stores';

export default function AdminDashboard() {
    const { posts, totalCount, isLoading, fetchPosts } = useBlogStore();

    // Calcular estadísticas desde los posts
    const stats = {
        total: totalCount,
        publicados: posts.filter(p => p.es_publicado).length,
        borradores: posts.filter(p => !p.es_publicado).length,
    };

    // Posts recientes (últimos 5)
    const recentPosts = posts.slice(0, 5);

    useEffect(() => {
        // Cargar posts si no están cargados aún
        if (posts.length === 0 && !isLoading) {
            fetchPosts();
        }
    }, [posts.length, isLoading, fetchPosts]);

    const statCards = [
        {
            title: 'Total de Posts',
            value: stats.total,
            icon: FileText,
            color: 'from-sky-600 to-blue-700',
            iconColor: 'text-sky-400',
        },
        {
            title: 'Publicados',
            value: stats.publicados,
            icon: Eye,
            color: 'from-emerald-600 to-green-700',
            iconColor: 'text-emerald-400',
        },
        {
            title: 'Borradores',
            value: stats.borradores,
            icon: EyeOff,
            color: 'from-amber-600 to-orange-700',
            iconColor: 'text-amber-400',
        },
    ];

    if (isLoading) {
        return (
            <div className="p-8">
                <div className="text-zinc-400">Cargando...</div>
            </div>
        );
    }

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
                <p className="text-zinc-400">Bienvenido al panel de administración de Printología</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {statCards.map((stat, index) => (
                    <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-white/20 transition-all"
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <stat.icon className={`w-8 h-8 ${stat.iconColor}`} />
                                <TrendingUp className="w-5 h-5 text-zinc-600" />
                            </div>
                            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                            <div className="text-sm text-zinc-400">{stat.title}</div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Recent Posts */}
            <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Clock className="w-5 h-5 text-violet-400" />
                        Posts Recientes
                    </h2>
                    <Link
                        href="/admin/blog"
                        className="text-sm text-sky-400 hover:text-sky-300 transition-colors"
                    >
                        Ver todos →
                    </Link>
                </div>

                {recentPosts.length === 0 ? (
                    <div className="text-center py-12">
                        <FileText className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                        <p className="text-zinc-500 mb-4">No hay posts todavía</p>
                        <Link
                            href="/admin/blog/nuevo"
                            className="inline-block px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors"
                        >
                            Crear primer post
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {recentPosts.map((post) => (
                            <Link
                                key={post.id}
                                href={`/admin/blog/editar/${post.id}`}
                                className="block p-4 bg-zinc-800/50 rounded-xl hover:bg-zinc-800 transition-all border border-white/5 hover:border-white/10"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <h3 className="text-white font-medium mb-1">{post.titulo}</h3>
                                        <p className="text-sm text-zinc-500">/{post.slug}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${post.es_publicado
                                                    ? 'bg-emerald-500/20 text-emerald-400'
                                                    : 'bg-amber-500/20 text-amber-400'
                                                }`}
                                        >
                                            {post.es_publicado ? 'Publicado' : 'Borrador'}
                                        </span>
                                        <span className="text-xs text-zinc-600">
                                            {post.updated_at ? new Date(post.updated_at!).toLocaleDateString('es-MX') : 'Sin fecha'}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <Link
                    href="/admin/blog/nuevo"
                    className="group p-6 bg-gradient-to-br from-sky-600/20 to-violet-600/20 border border-sky-500/30 rounded-2xl hover:border-sky-500/50 transition-all"
                >
                    <FileText className="w-8 h-8 text-sky-400 mb-3" />
                    <h3 className="text-lg font-bold text-white mb-2">Crear Nuevo Post</h3>
                    <p className="text-sm text-zinc-400">Escribe y publica un nuevo artículo en el blog</p>
                </Link>

                <Link
                    href="/admin/contenido"
                    className="group p-6 bg-gradient-to-br from-violet-600/20 to-amber-600/20 border border-violet-500/30 rounded-2xl hover:border-violet-500/50 transition-all"
                >
                    <ImageIcon className="w-8 h-8 text-violet-400 mb-3" />
                    <h3 className="text-lg font-bold text-white mb-2">Gestionar Contenido</h3>
                    <p className="text-sm text-zinc-400">Actualiza imágenes y contenido del sitio</p>
                </Link>
            </div>
        </div>
    );
}
