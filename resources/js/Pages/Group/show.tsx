import { Button } from '@/components/ui/button';
import { Group } from '@/types';
import { Link } from '@inertiajs/react';

interface Props {
    can: {
        create_expense: boolean;
    };
    model: {
        group: Group;
    };
}

const Show = ({ model, can }: Props) => {
    return (
        <>
            <div>
                <div>{model.group.name}</div>
                {model.group.description}
            </div>
            {can.create_expense && (
                <Button asChild>
                    <Link href={route('expenses.create', model.group.id)}>
                        Add Expense
                    </Link>
                </Button>
            )}
        </>
    );
};

export default Show;
