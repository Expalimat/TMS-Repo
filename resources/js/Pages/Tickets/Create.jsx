import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TicketForm from '@/Components/TicketForm';

export default function Create({ options }) {
    const form = useForm({
        title: '',
        description: '',
        priority: 'Medium',
        status: 'Open',
        category: 'Software',
    });

    const submit = (e) => {
        e.preventDefault();
        form.post(route('tickets.store'));
    };

    return (
        <AuthenticatedLayout header={<h1 className="text-xl font-semibold text-gray-800">New Ticket</h1>}>
            <Head title="New Ticket" />
            <div className="mx-auto max-w-3xl">
                <TicketForm
                    form={form}
                    options={options}
                    onSubmit={submit}
                    submitLabel="Create Ticket"
                    cancelHref={route('tickets.index')}
                />
            </div>
        </AuthenticatedLayout>
    );
}
