import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { MoreHorizontal } from 'lucide-react';

type Status = 'Paid' | 'Withdraw' | 'Overdue';

const statuses: Record<Status, string> = {
    Paid: 'text-green-700 bg-green-50 ring-green-600/20',
    Withdraw: 'text-gray-600 bg-gray-50 ring-gray-500/10',
    Overdue: 'text-red-700 bg-red-50 ring-red-600/10',
};

interface LastInvoice {
    date: string;
    dateTime: string;
    amount: string;
    status: Status;
}

interface Client {
    id: number;
    name: string;
    imageUrl: string;
    lastInvoice: LastInvoice;
}

const clients: Client[] = [
    {
        id: 1,
        name: 'Tuple',
        imageUrl: 'https://tailwindui.com/plus/img/logos/48x48/tuple.svg',
        lastInvoice: {
            date: 'December 13, 2022',
            dateTime: '2022-12-13',
            amount: '$2,000.00',
            status: 'Overdue',
        },
    },
    {
        id: 2,
        name: 'SavvyCal',
        imageUrl: 'https://tailwindui.com/plus/img/logos/48x48/savvycal.svg',
        lastInvoice: {
            date: 'January 22, 2023',
            dateTime: '2023-01-22',
            amount: '$14,000.00',
            status: 'Paid',
        },
    },
    {
        id: 3,
        name: 'Reform',
        imageUrl: 'https://tailwindui.com/plus/img/logos/48x48/reform.svg',
        lastInvoice: {
            date: 'January 23, 2023',
            dateTime: '2023-01-23',
            amount: '$7,600.00',
            status: 'Paid',
        },
    },
];

const ClientList = () => {
    return (
        <ul
            role="list"
            className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
        >
            {clients.map((client) => (
                <li
                    key={client.id}
                    className="overflow-hidden rounded-xl border bg-card text-card-foreground shadow"
                >
                    <div className="flex items-center gap-x-4 border-b p-6">
                        <img
                            alt={client.name}
                            src={client.imageUrl}
                            className="h-12 w-12 rounded-lg object-cover ring-1 ring-gray-900/10"
                        />
                        <div className="text-sm font-medium">{client.name}</div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="ml-auto h-8 w-8 p-0"
                                >
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                    View
                                    <span className="sr-only">
                                        , {client.name}
                                    </span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    Edit
                                    <span className="sr-only">
                                        , {client.name}
                                    </span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                        <div className="flex justify-between gap-x-4 py-3">
                            <dt className="text-muted-foreground">
                                Last invoice
                            </dt>
                            <dd className="text-foreground">
                                <time dateTime={client.lastInvoice.dateTime}>
                                    {client.lastInvoice.date}
                                </time>
                            </dd>
                        </div>
                        <div className="flex justify-between gap-x-4 py-3">
                            <dt className="text-muted-foreground">Amount</dt>
                            <dd className="flex items-start gap-x-2">
                                <div className="font-medium">
                                    {client.lastInvoice.amount}
                                </div>
                                <div
                                    className={cn(
                                        statuses[client.lastInvoice.status],
                                        'rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
                                    )}
                                >
                                    {client.lastInvoice.status}
                                </div>
                            </dd>
                        </div>
                    </dl>
                </li>
            ))}
        </ul>
    );
};

export default ClientList;
