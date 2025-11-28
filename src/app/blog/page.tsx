'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Search } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { blogPostSchema, type BlogPost } from '@/lib/zod/schemas';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('es_publicado', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Validate data with Zod
      const validatedPosts = data?.map(post => {
        try {
          return blogPostSchema.parse(post);
        } catch (error) {
          console.error('Invalid post data:', error);
          return null;
        }
      }).filter(Boolean) as BlogPost[] || [];

      setPosts(validatedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPosts = posts.filter(post =>
    post.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.contenido.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.extracto && post.extracto.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-violet-400"></div>
            <p className="text-zinc-400 mt-4">Cargando artículos...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/30 via-zinc-900/50 to-blue-900/30"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>

        <div className="relative container mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block px-4 py-2 bg-violet-600/20 backdrop-blur-sm border border-violet-400/30 rounded-full text-violet-300 text-sm font-semibold mb-6"
            >
              🖨️ Blog de Printología
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Conocimiento que
              <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent"> Imprime</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl text-zinc-300 mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              Descubre tips, tendencias y consejos sobre impresión de gran formato,
              diseño gráfico y soluciones visuales para hacer crecer tu negocio.
            </motion.p>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="max-w-lg mx-auto relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-blue-600/20 rounded-2xl blur-xl"></div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar artículos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-zinc-900/80 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400/50 text-lg transition-all duration-300"
                />
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex justify-center gap-8 mt-12 text-center"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-6 py-4">
                <div className="text-2xl font-bold text-violet-400">{posts.length}</div>
                <div className="text-sm text-zinc-400">Artículos</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-6 py-4">
                <div className="text-2xl font-bold text-blue-400">
                  {posts.filter(p => p.es_publicado).length}
                </div>
                <div className="text-sm text-zinc-400">Publicados</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-6 py-4">
                <div className="text-2xl font-bold text-emerald-400">∞</div>
                <div className="text-sm text-zinc-400">Conocimiento</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12">
        {filteredPosts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-6">📝</div>
            <h3 className="text-2xl font-bold text-white mb-4">
              {posts.length === 0 ? 'Próximamente' : 'No se encontraron artículos'}
            </h3>
            <p className="text-zinc-400 text-lg">
              {posts.length === 0
                ? 'Estamos preparando contenido interesante sobre impresión y diseño.'
                : 'Intenta con otros términos de búsqueda.'
              }
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-gradient-to-br from-zinc-900/80 to-zinc-800/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-violet-400/30 hover:shadow-2xl hover:shadow-violet-500/10 transition-all duration-500"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/0 to-blue-600/0 group-hover:from-violet-600/5 group-hover:to-blue-600/5 transition-all duration-500 rounded-3xl"></div>

                {/* Featured Image */}
                {post.imagen_url && (
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={post.imagen_url}
                      alt={post.titulo}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-violet-600/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-violet-400/30">
                        Artículo
                      </span>
                    </div>
                  </div>
                )}

                <div className="relative p-6">
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-zinc-400 mb-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-violet-400" />
                      <span className="font-medium">{formatDate(post.created_at || '')}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-violet-400" />
                      <span className="font-medium">{getReadingTime(post.contenido)} min</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-white mb-4 line-clamp-2 group-hover:text-violet-200 transition-colors duration-300 leading-tight">
                    <Link href={`/blog/${post.slug}`} className="hover:text-violet-200">
                      {post.titulo}
                    </Link>
                  </h2>

                  {/* Excerpt */}
                  {post.extracto && (
                    <p className="text-zinc-300 mb-6 line-clamp-3 leading-relaxed text-base">
                      {post.extracto}
                    </p>
                  )}

                  {/* Read More Button */}
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 hover:text-violet-200 font-semibold rounded-xl border border-violet-500/30 hover:border-violet-400/50 transition-all duration-300 group/btn"
                    >
                      Leer artículo
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </Link>

                    {/* Decorative element */}
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500/20 to-blue-500/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-violet-400 group-hover:bg-violet-300 transition-colors duration-300"></div>
                    </div>
                  </div>
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500/0 via-violet-500/50 to-blue-500/0 group-hover:via-violet-500/80 transition-all duration-500"></div>
              </motion.article>
            ))}
          </div>
        )}
      </div>

      {/* CTA Section */}
      {posts.length > 0 && (
        <div className="bg-gradient-to-r from-violet-600/10 to-blue-600/10 border-t border-white/10">
          <div className="container mx-auto px-6 py-16">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                ¿Necesitas servicios de impresión?
              </h3>
              <p className="text-zinc-300 mb-8 max-w-2xl mx-auto">
                Descubre cómo podemos ayudarte con tus proyectos de impresión de gran formato,
                diseño gráfico y soluciones visuales personalizadas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/calculadora"
                  className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-8 rounded-full transition-colors"
                >
                  Calcular Presupuesto
                </Link>
                <Link
                  href="/#contacto"
                  className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-full border border-white/20 transition-colors"
                >
                  Contactar
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}