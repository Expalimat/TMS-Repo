import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4">
            <Link href="/" className="mb-6 text-2xl font-bold text-indigo-600">
                HelpDesk
            </Link>
            <div className="w-full max-w-md rounded-lg bg-white px-6 py-6 shadow">{children}</div>
        </div>
    );
}
