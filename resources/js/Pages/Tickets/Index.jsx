import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Badge from '@/Components/Badge';
import Pagination from '@/Components/Pagination';

export default function Index({ tickets, filters, options }) {
    const [search, setSearch] = useState(filters.search ?? '');

    const apply = (next) => {
        const params = Object.fromEntries(Object.entries(next).filter(([, v]) => v));
        router.get(route('tickets.index'), params, { preserveState: true, replace: true });
    };
    const change = (key, value) => apply({ ...filters, search, [key]: value });

    const destroy = (ticket) => {
        if (confirm(`Delete "${ticket.title}"? This cannot be undone.`)) {
            router.delete(route('tickets.destroy', ticket.id), { preserveScroll: true });
        }
    };

    const filterSelect = (key, label, values) => (
        <select
            value={filters[key] ?? ''}
            onChange={(e) => change(key, e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm"
        >
            <option value="">{label}</option>
            {values.map((v) => <option key={v} value={v}>{v}</option>)}
        </select>
    );

    const hasFilters = Object.values(filters).some(Boolean);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold text-gray-800">My Tickets</h1>
                    <Link href={route('tickets.create')} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500">New Ticket</Link>
                </div>
            }
        >
            <Head title="Tickets" />

            <form
                onSubmit={(e) => { e.preventDefault(); change('search', search); }}
                className="mb-4 flex flex-col gap-2 sm:flex-row"
            >
                <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search title..."
                    className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
                />
                {filterSelect('status', 'All statuses', options.statuses)}
                {filterSelect('priority', 'All priorities', options.priorities)}
                {filterSelect('category', 'All categories', options.categories)}
                <button type="submit" className="rounded-md bg-gray-800 px-4 py-2 text-sm text-white hover:bg-gray-700">Search</button>
            </form>

            {tickets.data.length === 0 ? (
                <div className="rounded-lg bg-white p-10 text-center shadow-sm">
                    <p className="text-lg font-medium text-gray-800">
                        {hasFilters ? 'No tickets match your filters.' : 'No tickets yet.'}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                        {hasFilters ? 'Try clearing a filter.' : 'Create your first ticket to get started.'}
                    </p>
                    {!hasFilters && (
                        <Link href={route('tickets.create')} className="mt-4 inline-block rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500">Create a ticket</Link>
                    )}
                </div>
            ) : (
                <>
                    {/* Stacked cards on small screens */}
                    <div className="space-y-3 md:hidden">
                        {tickets.data.map((t) => (
                            <div key={t.id} className="rounded-lg bg-white p-4 shadow-sm">
                                <Link href={route('tickets.show', t.id)} className="font-medium text-indigo-700 break-words">{t.title}</Link>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    <Badge type="priority" value={t.priority} />
                                    <Badge type="status" value={t.status} />
                                    <span className="text-xs text-gray-500">{t.category}</span>
                                </div>
                                <div className="mt-3 flex gap-4 text-sm">
                                    <Link href={route('tickets.show', t.id)} className="text-gray-600 hover:underline">View</Link>
                                    <Link href={route('tickets.edit', t.id)} className="text-indigo-600 hover:underline">Edit</Link>
                                    <button type="button" onClick={() => destroy(t)} className="text-red-600 hover:underline">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Table on md and up */}
                    <div className="hidden overflow-hidden rounded-lg bg-white shadow-sm md:block">
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                            <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
                                <tr>
                                    <th className="px-4 py-3">Title</th>
                                    <th className="px-4 py-3">Category</th>
                                    <th className="px-4 py-3">Priority</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Created</th>
                                    <th className="px-4 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {tickets.data.map((t) => (
                                    <tr key={t.id} className="hover:bg-gray-50">
                                        <td className="max-w-xs truncate px-4 py-3">
                                            <Link href={route('tickets.show', t.id)} className="font-medium text-indigo-700 hover:underline">{t.title}</Link>
                                        </td>
                                        <td className="px-4 py-3 text-gray-600">{t.category}</td>
                                        <td className="px-4 py-3"><Badge type="priority" value={t.priority} /></td>
                                        <td className="px-4 py-3"><Badge type="status" value={t.status} /></td>
                                        <td className="px-4 py-3 text-gray-500">{new Date(t.created_at).toLocaleDateString()}</td>
                                        <td className="space-x-3 px-4 py-3 text-right">
                                            <Link href={route('tickets.edit', t.id)} className="text-indigo-600 hover:underline">Edit</Link>
                                            <button type="button" onClick={() => destroy(t)} className="text-red-600 hover:underline">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <Pagination links={tickets.links} />
                </>
            )}
        </AuthenticatedLayout>
    );
}
