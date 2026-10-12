import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import FlashMessage from '@/Components/FlashMessage';

export default function AuthenticatedLayout({ header, children }) {
    const { user } = usePage().props.auth;
    const [open, setOpen] = useState(false);

    const navLink = (href, label, active) => (
        <Link
            href={href}
            className={`rounded-md px-3 py-2 text-sm font-medium ${
                active ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
        >
            {label}
        </Link>
    );

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="border-b border-gray-200 bg-white">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2">
                        <Link href={route('dashboard')} className="mr-2 text-lg font-bold text-indigo-600">
                            HelpDesk
                        </Link>
                        <div className="hidden items-center gap-1 md:flex">
                            {navLink(route('dashboard'), 'Dashboard', route().current('dashboard'))}
                            {navLink(route('tickets.index'), 'Tickets', route().current('tickets.index'))}
                        </div>
                    </div>

                    <div className="hidden items-center gap-3 md:flex">
                        <Link
                            href={route('tickets.create')}
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                        >
                            New Ticket
                        </Link>
                        <Link href={route('profile.edit')} className="text-sm text-gray-700 hover:underline">
                            {user.name}
                        </Link>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-100"
                        >
                            Logout
                        </Link>
                    </div>

                    <button
                        type="button"
                        onClick={() => setOpen(!open)}
                        className="rounded-md p-2 text-gray-600 hover:bg-gray-100 md:hidden"
                        aria-label="Toggle menu"
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            {open ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
                        </svg>
                    </button>
                </div>

                {open && (
                    <div className="space-y-1 border-t border-gray-200 px-4 py-3 md:hidden">
                        <p className="px-3 pb-2 text-sm font-medium text-gray-800">{user.name}</p>
                        <Link href={route('dashboard')} className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</Link>
                        <Link href={route('tickets.index')} className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">Tickets</Link>
                        <Link href={route('tickets.create')} className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white">New Ticket</Link>
                        <Link href={route('profile.edit')} className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                        <Link href={route('logout')} method="post" as="button" className="block w-full rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">Logout</Link>
                    </div>
                )}
            </nav>

            {header && (
                <header className="bg-white shadow-sm">
                    <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <FlashMessage />

            <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
    );
}
