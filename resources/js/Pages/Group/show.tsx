import { Button } from '@/components/ui/button';
import AuthenticatedLayout from '@/Layouts/authenticated-layout';
import { Group } from '@/types';
import { Link } from '@inertiajs/react';

interface Props {
    model: {
        group: Group;
    };
}

const Show = ({ model }: Props) => {
    return (
        <AuthenticatedLayout>
            <div>
                <div>{model.group.name}</div>
                {model.group.description}
            </div>
            <Button asChild>
                <Link href={route('expenses.create', model.group.id)}>
                    Add Expense
                </Link>
            </Button>
        </AuthenticatedLayout>
    );
};

export default Show;
