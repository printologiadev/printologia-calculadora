import Link from 'next/link';
import Image from 'next/image';
import { FileText, LayoutDashboard } from 'lucide-react';
import AdminTools from '@/components/AdminTools';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 h-full w-64 bg-zinc-900 border-r border-white/10 flex flex-col">
                {/* Logo */}
                <div className="p-6 border-b border-white/10">
                    <Link href="/admin">
                        <Image
                            src="/LOGO_DARK.svg"
                            alt="Printología"
                            width={140}
                            height={35}
                            className="opacity-90"
                            style={{ width: 'auto', height: 'auto' }}
                        />
                    </Link>
                    <p className="text-xs text-zinc-500 mt-2">Panel de Administración</p>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2">
                    <Link
                        href="/admin"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        <span>Dashboard</span>
                    </Link>
                    <Link
                        href="/admin/blog"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
                    >
                        <FileText className="w-5 h-5" />
                        <span>Blog</span>
                    </Link>
                    <Link
                        href="/admin/contenido"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
                    >
                        <FileText className="w-5 h-5" />
                        <span>Contenido</span>
                    </Link>
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-white/10 space-y-2">
                    <Link
                        href="/blog"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-violet-400 hover:bg-violet-500/10 transition-all w-full"
                    >
                        <FileText className="w-5 h-5" />
                        <span>Ver Blog Público</span>
                    </Link>
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all w-full"
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        <span>Volver al sitio</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-64 min-h-screen">
                {children}
            </main>

            {/* Admin Tools */}
            <AdminTools position="bottom-right" />
        </div>
    );
}
