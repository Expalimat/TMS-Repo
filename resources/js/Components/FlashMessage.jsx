import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';

export default function FlashMessage() {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(false);
    const message = flash?.success || flash?.error;
    const isError = Boolean(flash?.error);

    // `flash` is a new object on every Inertia response, so repeated identical messages re-show.
    useEffect(() => {
        if (!message) return setVisible(false);
        setVisible(true);
        const t = setTimeout(() => setVisible(false), 4000);
        return () => clearTimeout(t);
    }, [flash]);

    if (!visible || !message) return null;

    return (
        <div className="mx-auto mt-4 max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
                role="alert"
                className={`flex items-center justify-between rounded-md border px-4 py-3 text-sm ${
                    isError
                        ? 'border-red-200 bg-red-50 text-red-800'
                        : 'border-green-200 bg-green-50 text-green-800'
                }`}
            >
                <span>{message}</span>
                <button
                    type="button"
                    onClick={() => setVisible(false)}
                    aria-label="Dismiss"
                    className="ml-4 text-lg leading-none opacity-60 hover:opacity-100"
                >
                    &times;
                </button>
            </div>
        </div>
    );
}
