'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useBlogStore } from '@/lib/stores';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const { currentPost, fetchPostById, updatePost, isLoading } = useBlogStore();

  const [formData, setFormData] = useState({
    titulo: '',
    contenido: '',
    extracto: '',
    imagen_url: '',
    meta_description: '',
    es_publicado: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingPost, setIsLoadingPost] = useState(true);

  const postId = params.id as string;

  useEffect(() => {
    if (postId) {
      fetchPostById(postId);
    }
  }, [postId, fetchPostById]);

  useEffect(() => {
    if (currentPost) {
      setFormData({
        titulo: currentPost.titulo || '',
        contenido: currentPost.contenido || '',
        extracto: currentPost.extracto || '',
        imagen_url: currentPost.imagen_url || '',
        meta_description: currentPost.meta_description || '',
        es_publicado: currentPost.es_publicado || false,
      });
      setIsLoadingPost(false);
    }
  }, [currentPost]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      titulo: value,
    }));

    // Clear title error if exists
    if (errors.titulo) {
      setErrors(prev => ({ ...prev, titulo: '' }));
    }
  };

  const handleContentChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      contenido: value,
    }));

    // Clear content error if exists
    if (errors.contenido) {
      setErrors(prev => ({ ...prev, contenido: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.titulo.trim()) {
      newErrors.titulo = 'El título es requerido';
    } else if (formData.titulo.length < 3) {
      newErrors.titulo = 'El título debe tener al menos 3 caracteres';
    } else if (formData.titulo.length > 200) {
      newErrors.titulo = 'El título es demasiado largo (máximo 200 caracteres)';
    }

    if (!formData.contenido.trim()) {
      newErrors.contenido = 'El contenido es requerido';
    } else if (formData.contenido.length < 10) {
      newErrors.contenido = 'El contenido debe tener al menos 10 caracteres';
    }

    if (formData.extracto && formData.extracto.length > 500) {
      newErrors.extracto = 'El extracto es demasiado largo (máximo 500 caracteres)';
    }

    if (formData.imagen_url && !formData.imagen_url.match(/^https?:\/\/.+/)) {
      newErrors.imagen_url = 'La URL de la imagen debe ser válida';
    }

    if (formData.meta_description && formData.meta_description.length > 160) {
      newErrors.meta_description = 'La meta descripción es demasiado larga (máximo 160 caracteres)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate slug from title
      const slug = generateSlug(formData.titulo);

      await updatePost(postId, {
        titulo: formData.titulo.trim(),
        slug,
        contenido: formData.contenido.trim(),
        extracto: formData.extracto.trim() || undefined,
        imagen_url: formData.imagen_url.trim() || undefined,
        meta_description: formData.meta_description.trim() || undefined,
        es_publicado: formData.es_publicado,
      });

      // Redirect to blog list
      router.push('/admin/blog');
    } catch (error) {
      console.error('Error updating post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingPost) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-violet-400 mx-auto mb-4" />
            <p className="text-zinc-400">Cargando post...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!currentPost) {
    return (
      <div className="p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Post no encontrado</h1>
          <p className="text-zinc-400 mb-6">El post que buscas no existe o ha sido eliminado.</p>
          <Link href="/admin/blog">
            <Button className="bg-violet-600 hover:bg-violet-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const wordCount = formData.contenido.trim().split(/\s+/).filter(word => word.length > 0).length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/blog">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Editar Post</h1>
            <p className="text-zinc-400">Modifica el contenido de tu artículo</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant={formData.es_publicado ? 'default' : 'secondary'}>
            {formData.es_publicado ? 'Publicado' : 'Borrador'}
          </Badge>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-violet-600 hover:bg-violet-700"
          >
            <Save className="w-4 h-4 mr-2" />
            {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <Card className="bg-zinc-900/50 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-lg">Título del Post</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Input
                  value={formData.titulo}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Escribe un título atractivo..."
                  className={`text-xl font-medium ${errors.titulo ? 'border-red-500' : ''}`}
                />
                {errors.titulo && (
                  <p className="text-sm text-red-400">{errors.titulo}</p>
                )}
                <p className="text-xs text-zinc-500">
                  Slug generado: <code className="bg-zinc-800 px-2 py-1 rounded">
                    {generateSlug(formData.titulo) || 'titulo-del-post'}
                  </code>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Content */}
          <Card className="bg-zinc-900/50 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-lg">Contenido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Textarea
                  value={formData.contenido}
                  onChange={(e) => handleContentChange(e.target.value)}
                  placeholder="Escribe el contenido de tu post aquí..."
                  rows={20}
                  className={`font-mono text-sm ${errors.contenido ? 'border-red-500' : ''}`}
                />
                {errors.contenido && (
                  <p className="text-sm text-red-400">{errors.contenido}</p>
                )}
                <div className="flex justify-between text-xs text-zinc-500">
                  <span>{wordCount} palabras</span>
                  <span>Tiempo de lectura: ~{readingTime} min</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Excerpt */}
          <Card className="bg-zinc-900/50 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-lg">Extracto (Opcional)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Textarea
                  value={formData.extracto}
                  onChange={(e) => setFormData(prev => ({ ...prev, extracto: e.target.value }))}
                  placeholder="Breve resumen del post para mostrar en listados..."
                  rows={3}
                  className={errors.extracto ? 'border-red-500' : ''}
                />
                {errors.extracto && (
                  <p className="text-sm text-red-400">{errors.extracto}</p>
                )}
                <p className="text-xs text-zinc-500">
                  {formData.extracto.length}/500 caracteres
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Settings */}
          <Card className="bg-zinc-900/50 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-lg">Configuración de Publicación</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="published" className="text-sm font-medium">
                  {formData.es_publicado ? 'Publicado' : 'Borrador'}
                </Label>
                <Switch
                  id="published"
                  checked={formData.es_publicado}
                  onCheckedChange={(checked) =>
                    setFormData(prev => ({ ...prev, es_publicado: checked }))
                  }
                />
              </div>
              <p className="text-xs text-zinc-500">
                {formData.es_publicado
                  ? 'Este post será visible públicamente'
                  : 'Este post solo será visible para administradores'
                }
              </p>
            </CardContent>
          </Card>

          {/* SEO Settings */}
          <Card className="bg-zinc-900/50 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-lg">SEO y Metadatos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Featured Image */}
              <div className="space-y-2">
                <Label htmlFor="image" className="text-sm font-medium">
                  Imagen Destacada (URL)
                </Label>
                <Input
                  id="image"
                  value={formData.imagen_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, imagen_url: e.target.value }))}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  className={errors.imagen_url ? 'border-red-500' : ''}
                />
                {errors.imagen_url && (
                  <p className="text-sm text-red-400">{errors.imagen_url}</p>
                )}
              </div>

              {/* Meta Description */}
              <div className="space-y-2">
                <Label htmlFor="meta" className="text-sm font-medium">
                  Meta Descripción
                </Label>
                <Textarea
                  id="meta"
                  value={formData.meta_description}
                  onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
                  placeholder="Descripción para motores de búsqueda..."
                  rows={3}
                  className={errors.meta_description ? 'border-red-500' : ''}
                />
                {errors.meta_description && (
                  <p className="text-sm text-red-400">{errors.meta_description}</p>
                )}
                <p className="text-xs text-zinc-500">
                  {formData.meta_description.length}/160 caracteres
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Post Info */}
          <Card className="bg-zinc-900/50 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-lg">Información del Post</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-zinc-400">Creado:</span>
                  <p className="text-white">
                    {currentPost.created_at ? new Date(currentPost.created_at).toLocaleDateString('es-MX') : 'Sin fecha'}
                  </p>
                </div>
                <div>
                  <span className="text-zinc-400">Última modificación:</span>
                  <p className="text-white">
                    {currentPost.updated_at ? new Date(currentPost.updated_at).toLocaleDateString('es-MX') : 'Sin fecha'}
                  </p>
                </div>
                <div>
                  <span className="text-zinc-400">ID:</span>
                  <p className="text-white font-mono text-xs">{currentPost.id}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card className="bg-zinc-900/50 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-lg">Vista Previa</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="border border-zinc-700 rounded-lg p-4 bg-zinc-800/50">
                  <h3 className="font-medium text-white mb-2">
                    {formData.titulo || 'Título del post'}
                  </h3>
                  {formData.extracto && (
                    <p className="text-sm text-zinc-400 mb-2">{formData.extracto}</p>
                  )}
                  <div className="flex items-center gap-4 text-xs text-zinc-500">
                    <span>{wordCount} palabras</span>
                    <span>~{readingTime} min de lectura</span>
                    <Badge variant="outline" className="text-xs">
                      {formData.es_publicado ? 'Publicado' : 'Borrador'}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}