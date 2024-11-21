import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { EXPENSE_STATUS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Expense, Group } from '@/types';
import { Link } from '@inertiajs/react';
import GroupParticipants from './partials/group-participants';
import GroupSettlingUp from './partials/group-settling-up';

interface Props {
    model: {
        group: Group;
        expenses: Expense[];
        balance: { [key: number]: string };
    };
}

const statusColor: { [key: string]: string } = {
    lent: 'text-green-500',
    borrowed: 'text-red-500',
    'not involved': 'text-gray-700',
};

const Show = ({ model }: Props) => {
    return (
        <>
            <div className="md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-lg font-semibold leading-7 sm:truncate md:text-2xl md:tracking-tight">
                        {model.group.name}
                    </h2>
                    <p className="text-sm font-medium text-muted-foreground">
                        {model.group.description}
                    </p>
                </div>
                <div className="mt-4 flex md:ml-4 md:mt-0">
                    {/* <button
                        type="button"
                        className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                        Edit
                    </button>
                    <button
                        type="button"
                        className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Publish
                    </button> */}
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="col-span-2 lg:col-span-1">
                    <GroupParticipants
                        participants={model.group.members}
                        balance={model.balance}
                    />
                </div>
                <div className="col-span-2 lg:col-span-1">
                    <GroupSettlingUp participants={model.group.members} />
                </div>
            </div>
            <Card className="mx-auto w-full">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-xl font-semibold">
                            Expenses
                        </CardTitle>
                        <CardDescription className="mt-1">
                            A list of all the group expenses
                        </CardDescription>
                    </div>
                    <Button asChild>
                        <Link href={route('expenses.create', model.group.id)}>
                            Add expense
                        </Link>
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Description</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Share Method</TableHead>
                                <TableHead>Paid By</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date of Expense</TableHead>
                                <TableHead className="w-[72px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {model.expenses.map((expense) => (
                                <TableRow key={expense.id}>
                                    <TableCell className="font-medium">
                                        <Button variant="link" asChild>
                                            <Link
                                                href={route('expenses.show', {
                                                    group: model.group,
                                                    expense: expense,
                                                })}
                                            >
                                                {expense.description}
                                            </Link>
                                        </Button>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {expense.amount}
                                    </TableCell>
                                    <TableCell className="capitalize text-muted-foreground">
                                        {expense.split_method}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {expense.payer.name}
                                    </TableCell>
                                    <TableCell
                                        className={cn(
                                            'text-muted-foreground',
                                            statusColor[expense.status],
                                        )}
                                    >
                                        <span className="capitalize">
                                            {`you ${expense.status}`}
                                            {expense.status !==
                                                EXPENSE_STATUS.not_involved &&
                                                ` - ${expense.splits_sum_amount}`}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {expense.expense_date}
                                    </TableCell>
                                    <TableCell className="flex items-center">
                                        <Button variant="link" asChild>
                                            <Link
                                                href={route('expenses.edit', {
                                                    group: model.group,
                                                    expense: expense,
                                                })}
                                            >
                                                Edit
                                            </Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    );
};

export default Show;
