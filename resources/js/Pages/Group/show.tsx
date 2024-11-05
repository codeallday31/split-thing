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
                                                    group: model.group.id,
                                                    expense: expense.id,
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
                                            !!model.amounts[expense.id]
                                                ? expense.payer.id ===
                                                  auth.user.id
                                                    ? 'text-green-500'
                                                    : 'text-red-500'
                                                : 'text-gray-700',
                                        )}
                                    >
                                        {!!model.amounts[expense.id]
                                            ? `You ${
                                                  expense.payer.id ===
                                                  auth.user.id
                                                      ? 'lent'
                                                      : 'borrowed'
                                              } (${model.amounts[expense.id]})`
                                            : 'Not Involved'}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {expense.expense_date}
                                    </TableCell>
                                    <TableCell className="flex items-center">
                                        <Button variant="link" asChild>
                                            <Link
                                                href={route('expenses.edit', {
                                                    group: model.group.id,
                                                    expense: expense.id,
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
