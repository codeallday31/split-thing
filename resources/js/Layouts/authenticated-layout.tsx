import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
    Bars4Icon,
    HomeIcon,
    UserGroupIcon,
} from '@heroicons/react/24/outline';
import { Head, Link } from '@inertiajs/react';

const AuthenticatedLayout = ({
    children,
    headTitle,
}: {
    children: React.ReactNode;
    headTitle?: string;
}) => {
    return (
        <>
            <Head title={headTitle} />
            <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
                <div className="hidden border-r bg-muted/40 md:block">
                    <div className="flex h-full max-h-screen flex-col gap-2">
                        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                            <Link
                                href="/"
                                className="flex items-center gap-2 font-semibold"
                            >
                                <span className="uppercase">Split thing</span>
                            </Link>
                        </div>
                        <div className="flex-1 overflow-auto">
                            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                                <Link
                                    href="#"
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                                >
                                    <HomeIcon className="h-4 w-4" />
                                    Dashboard
                                </Link>
                                <Link
                                    href={route('groups.index')}
                                    className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                                >
                                    <UserGroupIcon className="h-4 w-4" />
                                    Groups
                                </Link>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="flex h-screen flex-col">
                    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="shrink-0 md:hidden"
                                >
                                    <Bars4Icon className="h-5 w-5" />
                                    <span className="sr-only">
                                        Toggle navigation menu
                                    </span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="flex flex-col">
                                <nav className="grid gap-2 font-medium">
                                    <Link
                                        href="#"
                                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                                    >
                                        <HomeIcon className="h-4 w-4" />
                                        Dashboard
                                    </Link>
                                    <Link
                                        href={route('groups.index')}
                                        className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                                    >
                                        <UserGroupIcon className="h-4 w-4" />
                                        Groups
                                    </Link>
                                </nav>
                            </SheetContent>
                        </Sheet>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild className="ml-auto">
                                <Button
                                    variant="secondary"
                                    size="icon"
                                    className="rounded-full"
                                >
                                    <span className="sr-only">
                                        Toggle user menu
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>
                                    My Account
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                                <DropdownMenuItem>Support</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Link href="#" className="w-full">
                                        Logout
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </header>
                    <main className="flex-1 overflow-y-auto p-4 lg:p-6">
                        <div className="flex flex-col gap-4 lg:gap-6">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default AuthenticatedLayout;
