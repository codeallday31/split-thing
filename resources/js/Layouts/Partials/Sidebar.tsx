import { HomeIcon, UsersIcon } from '@heroicons/react/24/outline';
import { Link, usePage } from '@inertiajs/react';

interface SidebarProps {
    className: string;
    device?: DeviseType;
}

interface NavigationItem {
    name: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    routeName: string;
}

const navigation: NavigationItem[] = [
    {
        name: 'Dashboard',
        icon: HomeIcon,
        routeName: 'dashboard',
    },
    {
        name: 'Group',
        icon: UsersIcon,
        routeName: 'groups.index',
    },
];
type DeviseType = 'desktop' | 'mobile';

const classNames = (...classes: string[]): string => {
    return classes.filter(Boolean).join(' ');
};

const isCurrentRoute = (routeName: string): boolean => {
    return route().current(routeName);
};

export default function Sidebar({
    className = '',
    device = 'desktop',
}: SidebarProps) {
    const user = usePage().props.auth.user;
    return (
        <div
            className={
                `flex grow flex-col gap-y-5 overflow-y-auto ` + className
            }
        >
            <div className="flex h-16 shrink-0 items-center">
                <h1 className="text-xl font-semibold uppercase">Split thing</h1>
            </div>
            <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                        <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        className={classNames(
                                            isCurrentRoute(item.routeName)
                                                ? 'bg-gray-50 text-indigo-600'
                                                : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                                            'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                                        )}
                                        href={route(item.routeName)}
                                    >
                                        <item.icon
                                            aria-hidden="true"
                                            className={classNames(
                                                isCurrentRoute(item.routeName)
                                                    ? 'text-indigo-600'
                                                    : 'text-gray-400 group-hover:text-indigo-600',
                                                'h-6 w-6 shrink-0',
                                            )}
                                        />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                    {device === 'desktop' && (
                        <li className="-mx-6 mt-auto">
                            <a
                                href="#"
                                className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                            >
                                <img
                                    alt=""
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    className="h-8 w-8 rounded-full bg-gray-50"
                                />
                                <span className="sr-only">Your profile</span>
                                <span aria-hidden="true">{user.name}</span>
                            </a>
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    );
}
