'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { BlogPost } from '@/lib/zod/schemas';
import BlogComparison from '@/components/BlogComparison';

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const slug = params.slug;

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('es_publicado', true)
        .single();

      if (error || !data) {
        router.push('/blog');
        return;
      }

      setPost(data);
    } catch (error) {
      console.error('Error fetching post:', error);
      router.push('/blog');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="text-white">Cargando artículo...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Artículo no encontrado</h1>
          <Link href="/blog" className="text-violet-400 hover:text-violet-300">
            Volver al blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <Link href="/blog" className="text-zinc-400 hover:text-white mb-8 inline-block">
          ← Volver al blog
        </Link>

        <article className="max-w-4xl mx-auto">
          {/* Article Header */}
          <header className="mb-12 relative">
            {/* Decorative background */}
            <div className="absolute -inset-4 bg-gradient-to-r from-violet-600/10 to-blue-600/10 rounded-3xl blur-2xl"></div>

            <div className="relative bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-400 mb-6">
                <div className="flex items-center gap-2 bg-zinc-800/50 px-3 py-1 rounded-full">
                  <Calendar className="w-4 h-4 text-violet-400" />
                  <span className="font-medium">{new Date(post.created_at || '').toLocaleDateString('es-MX')}</span>
                </div>
                <div className="flex items-center gap-2 bg-zinc-800/50 px-3 py-1 rounded-full">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span className="font-medium">5 min de lectura</span>
                </div>
                <div className="flex items-center gap-2 bg-zinc-800/50 px-3 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span className="font-medium text-emerald-400">Publicado</span>
                </div>
              </div>

              {/* Title with gradient */}
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                <span className="bg-gradient-to-r from-white via-zinc-100 to-zinc-200 bg-clip-text text-transparent">
                  {post.titulo}
                </span>
              </h1>

              {/* Excerpt with better styling */}
              {post.extracto && (
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-violet-400 to-blue-400 rounded-full"></div>
                  <blockquote className="text-xl text-zinc-300 mb-0 pl-6 italic border-l-0">
                    "{post.extracto}"
                  </blockquote>
                </div>
              )}

              {/* Decorative elements */}
              <div className="flex items-center gap-2 mt-6">
                <div className="w-8 h-0.5 bg-gradient-to-r from-violet-400 to-blue-400 rounded-full"></div>
                <div className="w-2 h-2 rounded-full bg-violet-400"></div>
                <div className="w-4 h-0.5 bg-gradient-to-r from-blue-400 to-violet-400 rounded-full"></div>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div className="relative">
            {/* Content background */}
            <div className="absolute -inset-4 bg-gradient-to-br from-zinc-900/30 to-zinc-800/30 rounded-3xl blur-xl"></div>

            <div className="relative bg-zinc-900/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12">
                {/* Special content for comparison article */}
                {post.slug === 'vinil-adhesivo-vs-lona' ? (
                  <BlogComparison />
                ) : (
                  <div className="blog-content max-w-none">
                    <div dangerouslySetInnerHTML={{
                      __html: post.contenido
                        // Convertir párrafos (líneas vacías separan párrafos)
                        .split('\n\n')
                        .map(paragraph => {
                          if (paragraph.trim() === '') return '';
    
                          // Headers
                          if (paragraph.startsWith('# ')) {
                            return `<h1>${paragraph.substring(2)}</h1>`;
                          }
                          if (paragraph.startsWith('## ')) {
                            return `<h2>${paragraph.substring(3)}</h2>`;
                          }
                          if (paragraph.startsWith('### ')) {
                            return `<h3>${paragraph.substring(4)}</h3>`;
                          }
    
                          // Lists
                          if (paragraph.includes('\n- ')) {
                            const items = paragraph.split('\n').filter(line => line.startsWith('- '));
                            if (items.length > 0) {
                              return `<ul>${items.map(item => `<li>${item.substring(2)}</li>`).join('')}</ul>`;
                            }
                          }
    
                          if (paragraph.match(/^\d+\./m)) {
                            const items = paragraph.split('\n').filter(line => /^\d+\./.test(line));
                            if (items.length > 0) {
                              return `<ol>${items.map(item => `<li>${item.replace(/^\d+\.\s*/, '')}</li>`).join('')}</ol>`;
                            }
                          }
    
                          // Regular paragraph with inline formatting
                          let processed = paragraph
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            .replace(/\*(.*?)\*/g, '<em>$1</em>')
                            .replace(/`(.*?)`/g, '<code>$1</code>')
                            .replace(/\n/g, '<br>');
    
                          return `<p>${processed}</p>`;
                        })
                        .join('')
                    }} />
                  </div>
                )}

              {/* Bottom decorative element */}
              <div className="flex justify-center mt-12">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-violet-400 rounded-full"></div>
                  <div className="w-3 h-3 rounded-full bg-violet-400"></div>
                  <div className="w-8 h-0.5 bg-violet-400 rounded-full"></div>
                  <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                  <div className="w-8 h-0.5 bg-blue-400 rounded-full"></div>
                  <div className="w-3 h-3 rounded-full bg-violet-400"></div>
                  <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-blue-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}