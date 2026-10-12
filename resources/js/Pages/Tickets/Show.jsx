import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Badge from '@/Components/Badge';

export default function Show({ ticket }) {
    const destroy = () => {
        if (confirm('Delete this ticket? This cannot be undone.')) {
            router.delete(route('tickets.destroy', ticket.id));
        }
    };

    return (
        <AuthenticatedLayout header={<h1 className="text-xl font-semibold text-gray-800">Ticket #{ticket.id}</h1>}>
            <Head title={ticket.title} />
            <div className="mx-auto max-w-3xl space-y-4 rounded-lg bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-3">
                    <h2 className="text-lg font-semibold text-gray-900 break-words">{ticket.title}</h2>
                    <div className="flex gap-2">
                        <Badge type="priority" value={ticket.priority} />
                        <Badge type="status" value={ticket.status} />
                    </div>
                </div>

                <dl className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
                    <div><dt className="text-gray-500">Category</dt><dd className="font-medium text-gray-800">{ticket.category}</dd></div>
                    <div><dt className="text-gray-500">Created</dt><dd className="font-medium text-gray-800">{new Date(ticket.created_at).toLocaleString()}</dd></div>
                    <div><dt className="text-gray-500">Updated</dt><dd className="font-medium text-gray-800">{new Date(ticket.updated_at).toLocaleString()}</dd></div>
                </dl>

                <div>
                    <h3 className="mb-1 text-sm text-gray-500">Description</h3>
                    {/* React escapes this text automatically; no dangerouslySetInnerHTML */}
                    <p className="whitespace-pre-line break-words text-gray-800">{ticket.description}</p>
                </div>

                <div className="flex flex-wrap gap-3 border-t border-gray-100 pt-4">
                    <Link href={route('tickets.edit', ticket.id)} className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500">Edit</Link>
                    <button type="button" onClick={destroy} className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500">Delete</button>
                    <Link href={route('tickets.index')} className="px-2 py-2 text-sm text-gray-600 hover:underline">Back to list</Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
