import GroupList from '@/components/group-list';
import { Button } from '@/components/ui/button';
import { Group } from '@/types';
import { Link } from '@inertiajs/react';

interface Props {
    model: {
        groups: Group[];
        count_of_group_members: { [key: number]: number };
        has_groups: boolean;
    };
}

const Index = ({ model }: Props) => {
    return (
        <>
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Groups</h1>
            </div>
            {model.has_groups ? (
                <GroupList groups={model.groups} />
            ) : (
                <div className="flex flex-1 items-center justify-center rounded-lg shadow-sm">
                    <div className="flex flex-col items-center gap-1 text-center">
                        <h3 className="text-2xl font-bold tracking-tight">
                            You have no created groups
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            You can start adding expenses once you create a
                            group.
                        </p>
                        <Button className="mt-4" asChild>
                            <Link href={route('groups.create')}>
                                Create Group
                            </Link>
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Index;
