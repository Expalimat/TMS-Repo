const priorityStyles = {
    Low: 'bg-gray-100 text-gray-700 ring-gray-300',
    Medium: 'bg-blue-100 text-blue-700 ring-blue-300',
    High: 'bg-orange-100 text-orange-700 ring-orange-300',
    Urgent: 'bg-red-100 text-red-700 ring-red-300',
};

const statusStyles = {
    Open: 'bg-green-100 text-green-700 ring-green-300',
    'In Progress': 'bg-yellow-100 text-yellow-800 ring-yellow-300',
    Resolved: 'bg-indigo-100 text-indigo-700 ring-indigo-300',
    Closed: 'bg-gray-200 text-gray-600 ring-gray-300',
};

export default function Badge({ type, value }) {
    const styles = type === 'priority' ? priorityStyles : statusStyles;
    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${
                styles[value] ?? 'bg-gray-100 text-gray-700 ring-gray-300'
            }`}
        >
            {value}
        </span>
    );
}
