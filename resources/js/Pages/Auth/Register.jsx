import { Head, Link, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const field = (id, label, type, autoComplete) => (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
            <input
                id={id}
                type={type}
                value={data[id]}
                autoComplete={autoComplete}
                onChange={(e) => setData(id, e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors[id] && <p className="mt-1 text-sm text-red-600">{errors[id]}</p>}
        </div>
    );

    return (
        <GuestLayout>
            <Head title="Register" />
            <form onSubmit={submit} className="space-y-4">
                {field('name', 'Name', 'text', 'name')}
                {field('email', 'Email', 'email', 'username')}
                {field('password', 'Password', 'password', 'new-password')}
                {field('password_confirmation', 'Confirm password', 'password', 'new-password')}

                <div className="flex items-center justify-between">
                    <Link href={route('login')} className="text-sm text-gray-600 underline hover:text-gray-900">
                        Already registered?
                    </Link>
                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-50"
                    >
                        Register
                    </button>
                </div>
            </form>
        </GuestLayout>
    );
}
