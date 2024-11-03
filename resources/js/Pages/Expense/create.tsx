import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Expense, Group } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { FormEvent } from 'react';

interface Member {
    id: number;
    name: string;
}

interface IGroup extends Group {
    members: Member[];
}

interface SplitOption {
    label: string;
    value: string;
}

interface ExpenseParticipant extends Member {
    isSelected: boolean;
    value: string | number;
}

interface Props {
    model: {
        group: IGroup;
        split_options: SplitOption[];
        expense?: Expense;
    };
}

const Create = ({ model }: Props) => {
    const { auth } = usePage().props;
    const groupMembers = [
        { id: auth.user.id, name: 'Me' },
        ...model.group.members,
    ];

    const { data, setData, post, transform } = useForm<{
        description: string;
        amount: string | number;
        expenseDate: string;
        payerId: string;
        splitMethod: string;
        participants: ExpenseParticipant[];
    }>({
        description: '',
        amount: 0,
        expenseDate: '2024-10-23',
        payerId: '',
        splitMethod: 'equally',
        participants: groupMembers.map((member) => ({
            ...member,
            isSelected: true,
            value: 0,
        })),
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        transform((data) => ({
            ...data,
            groupId: model.group.id,
        }));

        post(route('expenses.store', model.group.id));
    };

    const handleSelectParticipantChange = (
        isChecked: boolean,
        memberId: number,
    ) => {
        setData(
            'participants',
            data.participants.map((participant) =>
                participant.id === memberId
                    ? { ...participant, isSelected: isChecked, value: 0 }
                    : participant,
            ),
        );
    };

    const handleSplitValueChange = (id: number, value: number | string) => {
        setData(
            'participants',
            data.participants.map((participant) =>
                participant.id === id ? { ...participant, value } : participant,
            ),
        );
    };

    return (
        <>
            <form className="mx0a grid gap-6" onSubmit={handleSubmit}>
                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle>
                            <span className="text-lg">Expense Details</span>
                        </CardTitle>
                        <CardDescription>
                            Enter the details of the expense, including the
                            amount, date, and the person who paid for it
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="description">description</Label>
                            <Input
                                id="description"
                                name="description"
                                value={data.description}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="amount">Amount</Label>
                            <Input
                                type="number"
                                id="amount"
                                name="amount"
                                min={0}
                                step={0.01}
                                value={data.amount}
                                onChange={(e) =>
                                    setData('amount', e.target.value)
                                }
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="expense-date">
                                Date of Expense
                            </Label>
                            <Input
                                id="expense-date"
                                name="expense-date"
                                type="date"
                                value={data.expenseDate}
                                onChange={(e) =>
                                    setData('expenseDate', e.target.value)
                                }
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label>Paid by</Label>
                            <Select
                                value={data.payerId}
                                onValueChange={(value) =>
                                    setData('payerId', value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select who paid for" />
                                </SelectTrigger>
                                <SelectContent>
                                    {groupMembers.map((member) => (
                                        <SelectItem
                                            value={member.id.toString()}
                                            key={member.id}
                                        >
                                            {member.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>
                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle>
                            <span className="text-lg">Participants</span>
                        </CardTitle>
                        <CardDescription>
                            Select who are involved in this expense and choose
                            how to divide the cost.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="divide-y divide-gray-800 border-b border-t border-gray-800">
                            {data.participants.map((p) => (
                                <div
                                    key={p.id}
                                    className="items-star-2 relative flex py-4"
                                >
                                    <div className="min-w-0 flex-1 text-sm leading-6">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`participant-${p.id}`}
                                                checked={p.isSelected}
                                                onCheckedChange={(isChecked) =>
                                                    handleSelectParticipantChange(
                                                        !!isChecked,
                                                        p.id,
                                                    )
                                                }
                                            />
                                            <Label
                                                htmlFor={`participant-${p.id}`}
                                                className="select-none font-medium"
                                            >
                                                {p.name}
                                            </Label>
                                        </div>
                                    </div>

                                    <div className="ml-3 flex h-6 items-center">
                                        {data.splitMethod !== 'equally' && (
                                            <Input
                                                type="number"
                                                id={`participant-${p.id}`}
                                                name="amount"
                                                min={0}
                                                step={0.01}
                                                disabled={!p.isSelected}
                                                value={p.value}
                                                onChange={(e) =>
                                                    handleSplitValueChange(
                                                        p.id,
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Label className="mr-2 text-sm italic">
                            Splitting options:
                        </Label>
                        <RadioGroup
                            value={data.splitMethod}
                            onValueChange={(value) =>
                                setData('splitMethod', value)
                            }
                            className="flex items-center space-x-3"
                        >
                            {model.split_options.map((option) => (
                                <div
                                    className="flex items-center space-x-2"
                                    key={option.value}
                                >
                                    <RadioGroupItem
                                        value={option.value}
                                        id={`split-opt-${option.value}`}
                                    />
                                    <Label
                                        htmlFor={`split-opt-${option.value}`}
                                    >
                                        {option.label}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </CardFooter>
                </Card>

                <div>
                    <Button type="submit">Save</Button>
                </div>
            </form>
        </>
    );
};

export default Create;
