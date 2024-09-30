import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Create() {
    return (
        <AuthenticatedLayout>
            <Head title="Group" />
            <div>This is Create new group</div>
        </AuthenticatedLayout>
    );
}
