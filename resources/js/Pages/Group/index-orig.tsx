import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid';
import { Head, Link } from '@inertiajs/react';

interface ILastInvoice {
    date: string;
    dateTime: string;
    amount: string;
    status: string;
}

interface IClient {
    id: number;
    name: string;
    imageUrl: string;
    lastInvoice: ILastInvoice;
}

const statuses: {
    [key: string]: string;
} = {
    Paid: 'text-green-700 bg-green-50 ring-green-600/20',
    Withdraw: 'text-gray-600 bg-gray-50 ring-gray-500/10',
    Overdue: 'text-red-700 bg-red-50 ring-red-600/10',
};

const clients: IClient[] = [
    {
        id: 1,
        name: 'Tuple',
        imageUrl: 'https://tailwindui.com/img/logos/48x48/tuple.svg',
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
        imageUrl: 'https://tailwindui.com/img/logos/48x48/savvycal.svg',
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
        imageUrl: 'https://tailwindui.com/img/logos/48x48/reform.svg',
        lastInvoice: {
            date: 'January 23, 2023',
            dateTime: '2023-01-23',
            amount: '$7,600.00',
            status: 'Paid',
        },
    },
];

const classNames = (...classes: string[]): string => {
    return classes.filter(Boolean).join(' ');
};

export default function Index() {
    return (
        <AuthenticatedLayout>
            <Head title="Group" />
            <div className="mb-5 border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                    Group that you created
                </h3>
                <div className="mt-3 sm:ml-4 sm:mt-0">
                    <Link
                        href={route('groups.create')}
                        as="button"
                        className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Create new Group
                    </Link>
                </div>
            </div>
            <ul
                role="list"
                className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
            >
                {clients.map((client) => (
                    <li
                        key={client.id}
                        className="overflow-hidden rounded-xl border border-gray-200"
                    >
                        <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                            <img
                                alt={client.name}
                                src={client.imageUrl}
                                className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
                            />
                            <div className="text-sm font-medium leading-6 text-gray-900">
                                {client.name}
                            </div>
                            <Menu as="div" className="relative ml-auto">
                                <MenuButton className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
                                    <span className="sr-only">
                                        Open options
                                    </span>
                                    <EllipsisHorizontalIcon
                                        aria-hidden="true"
                                        className="h-5 w-5"
                                    />
                                </MenuButton>
                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                    <MenuItem>
                                        <a
                                            href="#"
                                            className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50"
                                        >
                                            View
                                            <span className="sr-only">
                                                , {client.name}
                                            </span>
                                        </a>
                                    </MenuItem>
                                    <MenuItem>
                                        <a
                                            href="#"
                                            className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50"
                                        >
                                            Edit
                                            <span className="sr-only">
                                                , {client.name}
                                            </span>
                                        </a>
                                    </MenuItem>
                                </MenuItems>
                            </Menu>
                        </div>
                        <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                            <div className="flex justify-between gap-x-4 py-3">
                                <dt className="text-gray-500">Last invoice</dt>
                                <dd className="text-gray-700">
                                    <time
                                        dateTime={client.lastInvoice.dateTime}
                                    >
                                        {client.lastInvoice.date}
                                    </time>
                                </dd>
                            </div>
                            <div className="flex justify-between gap-x-4 py-3">
                                <dt className="text-gray-500">Amount</dt>
                                <dd className="flex items-start gap-x-2">
                                    <div className="font-medium text-gray-900">
                                        {client.lastInvoice.amount}
                                    </div>
                                    <div
                                        className={classNames(
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
        </AuthenticatedLayout>
    );
}
