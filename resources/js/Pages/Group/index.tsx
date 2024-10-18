import ClientList from '@/Components/client-list';
import { Button } from '@/components/ui/button';
import AuthenticatedLayout from '@/Layouts/authenticated-layout';
import { Link } from '@inertiajs/react';

const Index = () => {
    return (
        <AuthenticatedLayout headTitle="Group">
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">
                    Groups you made
                </h1>
            </div>
            <ClientList />
            <div className="flex flex-1 items-center justify-center rounded-lg shadow-sm">
                <div className="flex flex-col items-center gap-1 text-center">
                    <h3 className="text-2xl font-bold tracking-tight">
                        You have no created groups
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        You can start adding expenses once you create a group.
                    </p>
                    <Button className="mt-4" asChild>
                        <Link href={route('groups.create')}>Create Group</Link>
                    </Button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
