import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { supabase } from '@/lib/supabase';
import { blogPostSchema, blogFiltersSchema, type BlogPost, type BlogFilters } from '@/lib/zod/schemas';
import { useUiStore } from './ui-store';

interface BlogState {
  // Data
  posts: BlogPost[];
  currentPost: BlogPost | null;
  totalCount: number;

  // Filters & pagination
  filters: BlogFilters;
  isLoading: boolean;

  // Actions
  fetchPosts: () => Promise<void>;
  fetchPostById: (id: string) => Promise<void>;
  createPost: (post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updatePost: (id: string, updates: Partial<BlogPost>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  setFilters: (filters: Partial<BlogFilters>) => void;
  resetFilters: () => void;
  clearCurrentPost: () => void;
}

const initialFilters: BlogFilters = {
  search: '',
  published: null,
  limit: 10,
  offset: 0,
};

export const useBlogStore = create<BlogState>()(
  devtools(
    (set, get) => ({
      // Initial state
      posts: [],
      currentPost: null,
      totalCount: 0,
      filters: initialFilters,
      isLoading: false,

      // Fetch posts with filters
      fetchPosts: async () => {
        const { filters } = get();
        const uiStore = useUiStore.getState();

        set({ isLoading: true });
        uiStore.setLoading(true, 'Cargando posts...');

        try {
          let query = supabase
            .from('blog_posts')
            .select('*', { count: 'exact' })
            .order('updated_at', { ascending: false })
            .range(filters.offset, filters.offset + filters.limit - 1);

          // Apply filters
          if (filters.search) {
            query = query.or(`titulo.ilike.%${filters.search}%,contenido.ilike.%${filters.search}%`);
          }

          if (filters.published !== null) {
            query = query.eq('es_publicado', filters.published);
          }

          const { data, error, count } = await query;

          if (error) throw error;

          // Validate data with Zod
          const validatedPosts = data?.map(post => blogPostSchema.parse(post)) || [];

          set({
            posts: validatedPosts,
            totalCount: count || 0,
            isLoading: false
          });

          uiStore.setLoading(false);
        } catch (error: unknown) {
          console.error('Error fetching posts:', error);
          const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
          uiStore.setError('Error al cargar los posts', errorMessage);
          set({ isLoading: false });
        }
      },

      // Fetch single post by ID
      fetchPostById: async (id: string) => {
        const uiStore = useUiStore.getState();

        set({ isLoading: true });
        uiStore.setLoading(true, 'Cargando post...');

        try {
          const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('id', id)
            .single();

          if (error) throw error;

          // Validate data with Zod
          const validatedPost = blogPostSchema.parse(data);

          set({
            currentPost: validatedPost,
            isLoading: false
          });

          uiStore.setLoading(false);
        } catch (error: unknown) {
          console.error('Error fetching post:', error);
          const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
          uiStore.setError('Error al cargar el post', errorMessage);
          set({ isLoading: false });
        }
      },

      // Create new post
      createPost: async (postData) => {
        const uiStore = useUiStore.getState();

        // Validate input data
        const validatedData = blogPostSchema.omit({
          id: true,
          created_at: true,
          updated_at: true
        }).parse(postData);

        uiStore.setLoading(true, 'Creando post...');

        try {
          const { data, error } = await supabase
            .from('blog_posts')
            .insert(validatedData)
            .select()
            .single();

          if (error) throw error;

          // Validate response data
          const validatedPost = blogPostSchema.parse(data);

          // Update local state
          const { posts } = get();
          set({ posts: [validatedPost, ...posts] });

          uiStore.setSuccess('Post creado exitosamente');
          uiStore.setLoading(false);
        } catch (error: unknown) {
          console.error('Error creating post:', error);
          const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
          uiStore.setError('Error al crear el post', errorMessage);
        }
      },

      // Update existing post
      updatePost: async (id: string, updates) => {
        const uiStore = useUiStore.getState();

        // Validate updates
        const validatedUpdates = blogPostSchema.partial().parse(updates);

        uiStore.setLoading(true, 'Actualizando post...');

        try {
          const { data, error } = await supabase
            .from('blog_posts')
            .update(validatedUpdates)
            .eq('id', id)
            .select()
            .single();

          if (error) throw error;

          // Validate response data
          const validatedPost = blogPostSchema.parse(data);

          // Update local state
          const { posts, currentPost } = get();
          const updatedPosts = posts.map(post =>
            post.id === id ? validatedPost : post
          );

          set({
            posts: updatedPosts,
            currentPost: currentPost?.id === id ? validatedPost : currentPost
          });

          uiStore.setSuccess('Post actualizado exitosamente');
          uiStore.setLoading(false);
        } catch (error: unknown) {
          console.error('Error updating post:', error);
          const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
          uiStore.setError('Error al actualizar el post', errorMessage);
        }
      },

      // Delete post
      deletePost: async (id: string) => {
        const uiStore = useUiStore.getState();

        uiStore.setLoading(true, 'Eliminando post...');

        try {
          const { error } = await supabase
            .from('blog_posts')
            .delete()
            .eq('id', id);

          if (error) throw error;

          // Update local state
          const { posts, currentPost } = get();
          const filteredPosts = posts.filter(post => post.id !== id);

          set({
            posts: filteredPosts,
            currentPost: currentPost?.id === id ? null : currentPost
          });

          uiStore.setSuccess('Post eliminado exitosamente');
          uiStore.setLoading(false);
        } catch (error: unknown) {
          console.error('Error deleting post:', error);
          const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
          uiStore.setError('Error al eliminar el post', errorMessage);
        }
      },

      // Set filters
      setFilters: (newFilters) => {
        const currentFilters = get().filters;
        const updatedFilters = blogFiltersSchema.parse({
          ...currentFilters,
          ...newFilters
        });

        set({ filters: updatedFilters });
      },

      // Reset filters
      resetFilters: () => {
        set({ filters: initialFilters });
      },

      // Clear current post
      clearCurrentPost: () => {
        set({ currentPost: null });
      },
    }),
    { name: 'blog-store' }
  )
);