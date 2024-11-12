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
import { cn } from '@/lib/utils';
import { Expense, Group } from '@/types';
import { Link, usePage } from '@inertiajs/react';

interface Props {
    model: {
        group: Group;
        expenses: Expense[];
        amounts: { [key: number]: string };
    };
}

const Show = ({ model }: Props) => {
    const { auth } = usePage().props;
    return (
        <>
            <div>
                <div>{model.group.name}</div>
                {model.group.description}
            </div>
            {/* <div className="m-0 grid grid-cols-2 gap-8">
                <Badge
                    variant="outline"
                    className="flex items-center justify-between rounded-lg px-8 py-5 shadow"
                >
                    <div className="flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-circle-off h-14 w-14"
                        >
                            <path d="m2 2 20 20" />
                            <path d="M8.35 2.69A10 10 0 0 1 21.3 15.65" />
                            <path d="M19.08 19.08A10 10 0 1 1 4.92 4.92" />
                        </svg>
                        <div className="ml-3 text-xl font-medium capitalize text-white">
                            {ExpenseStatus.Unpaid}
                        </div>
                    </div>
                    <div className="text-2xl font-medium">1</div>
                </Badge>
                <Badge
                    variant="outline"
                    className="flex items-center justify-between rounded-lg px-8 py-5 shadow"
                >
                    <div className="flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-handshake h-14 w-14"
                        >
                            <path d="m11 17 2 2a1 1 0 1 0 3-3" />
                            <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
                            <path d="m21 3 1 11h-2" />
                            <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
                            <path d="M3 4h8" />
                        </svg>
                        <div className="ml-3 text-xl font-medium capitalize text-white">
                            {ExpenseStatus.Settled}
                        </div>
                    </div>
                    <div className="text-2xl font-medium">13</div>
                </Badge>
            </div> */}
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
                                        className={cn('text-muted-foreground')}
                                    >
                                        {`${expense.status} - ${model.amounts[expense.id]}`}
                                        {/* !!model.amounts[expense.id]
                                                ? expense.payer.id ===
                                                  auth.user.id
                                                    ? 'text-green-500'
                                                    : 'text-red-500'
                                                : 'text-gray-700', */}
                                        {/* {!!model.amounts[expense.id]
                                            ? `You ${
                                                  expense.payer.id ===
                                                  auth.user.id
                                                      ? 'lent'
                                                      : 'borrowed'
                                              } (${model.amounts[expense.id]})`
                                            : 'Not Involved'} */}
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
