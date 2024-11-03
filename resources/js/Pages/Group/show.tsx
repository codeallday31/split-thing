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
import { Expense, Group } from '@/types';
import { Link } from '@inertiajs/react';

interface Props {
    model: {
        group: Group;
        expenses: Expense[];
    };
}

const Show = ({ model }: Props) => {
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
                                <TableHead>Expense Date</TableHead>
                                <TableHead>Paid By</TableHead>
                                <TableHead className="w-[72px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {model.expenses.map((expense) => (
                                <TableRow key={expense.id}>
                                    <TableCell className="font-medium">
                                        {expense.description}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {expense.amount}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {expense.expense_date}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {expense.payer}
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
