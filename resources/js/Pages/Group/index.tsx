import GroupList from '@/components/group-list';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { Group } from '@/types';
import { Link, router } from '@inertiajs/react';
import { TabsContent } from '@radix-ui/react-tabs';

interface Props {
    all_groups?: Group[];
    created_groups?: Group[];
    joined_groups?: Group[];
    has_groups: boolean;
}

const Index = ({
    all_groups,
    created_groups,
    joined_groups,
    has_groups,
}: Props) => {
    const handleTabValueChange = (value: string) => {
        router.reload({ only: [value] });
    };
    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Groups</h1>
                {has_groups && (
                    <Button asChild>
                        <Link href={route('groups.create')}>Create Group</Link>
                    </Button>
                )}
            </div>
            <Tabs
                defaultValue="all_groups"
                className="w-full space-y-6"
                onValueChange={handleTabValueChange}
            >
                <TabsList>
                    <TabsTrigger disabled={!has_groups} value="all_groups">
                        All Groups
                    </TabsTrigger>
                    <TabsTrigger disabled={!has_groups} value="created_groups">
                        Created Groups
                    </TabsTrigger>
                    <TabsTrigger disabled={!has_groups} value="joined_groups">
                        Joined Groups
                    </TabsTrigger>
                </TabsList>
                {has_groups ? (
                    <>
                        <TabsContent value="all_groups">
                            {all_groups && all_groups.length > 0 && (
                                <GroupList groups={all_groups} />
                            )}
                        </TabsContent>
                        <TabsContent value="created_groups">
                            {created_groups && created_groups.length > 0 && (
                                <GroupList groups={created_groups} />
                            )}
                        </TabsContent>
                        <TabsContent value="joined_groups">
                            {joined_groups && joined_groups.length > 0 && (
                                <GroupList groups={joined_groups} />
                            )}
                        </TabsContent>
                    </>
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
            </Tabs>
        </>
    );
};

export default Index;
