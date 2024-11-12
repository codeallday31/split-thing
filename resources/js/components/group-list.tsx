import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { stringLimit } from '@/lib/utils';
import { GroupRecord } from '@/types';
import { Link } from '@inertiajs/react';
import { MoreHorizontal } from 'lucide-react';

interface Props {
    groups: GroupRecord[];
}

const GroupList = ({ groups }: Props) => {
    return (
        <ul
            role="list"
            className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
        >
            {groups.map((group) => (
                <li
                    key={group.id}
                    className="overflow-hidden rounded-xl border bg-card text-card-foreground shadow"
                >
                    <div className="flex items-center gap-x-4 border-b p-6">
                        <img
                            alt={group.name}
                            src="https://tailwindui.com/plus/img/logos/48x48/tuple.svg"
                            className="h-12 w-12 rounded-lg object-cover ring-1 ring-gray-900/10"
                        />
                        <div className="text-sm font-medium">
                            {group.name}
                            <p className="text-xs text-muted-foreground">
                                {stringLimit(group.description, 50)}
                            </p>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="ml-auto h-8 w-8 p-0"
                                >
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                    <Link href={route('groups.show', group)}>
                                        View
                                    </Link>
                                </DropdownMenuItem>
                                {group.can.modify && (
                                    <DropdownMenuItem asChild>
                                        <Link
                                            href={route('groups.edit', group)}
                                        >
                                            Edit
                                        </Link>
                                    </DropdownMenuItem>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <dl className="-my-3 divide-y divide-gray-300 px-6 py-4 text-sm leading-6">
                        {/* <div className="flex justify-between gap-x-4 py-3">
                            <dt className="text-muted-foreground">
                                Group Owner
                            </dt>
                            <dd className="flex items-start gap-x-2">
                                <div className="font-medium">
                                    {group.owner.id === authUser.id
                                        ? 'Me'
                                        : group.owner.name}
                                </div>
                            </dd>
                        </div> */}
                        <div className="flex justify-between gap-x-4 py-3">
                            <dt className="text-muted-foreground">
                                Date created
                            </dt>
                            <dd className="text-foreground">
                                <time>{group.created_at}</time>
                            </dd>
                        </div>
                    </dl>
                </li>
            ))}
        </ul>
    );
};

export default GroupList;
