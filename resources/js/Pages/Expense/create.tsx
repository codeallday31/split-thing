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
import { Group } from '@/types';
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
    name: string;
    value: string;
}

interface Props {
    model: {
        group: IGroup;
        split_options: SplitOption[];
    };
}

const Create = ({ model }: Props) => {
    const { auth } = usePage().props;
    const participants = [
        { id: auth.user.id, name: 'Me' },
        ...model.group.members,
    ];
    const { data, setData, post, transform } = useForm<{
        description: string;
        amount: string;
        dateOfExpense: string;
        paidBy: string;
        splitMethod: string;
        participants: number[];
    }>({
        description: '',
        amount: '',
        dateOfExpense: '2024-10-23',
        paidBy: '',
        splitMethod: 'equally',
        participants: participants.map((a) => a.id),
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        transform((data) => ({
            ...data,
            groupId: model.group.id,
        }));
        post(route('expenses.store', model.group.id));
    };

    return (
        <>
            <form className="grid gap-6" onSubmit={handleSubmit}>
                <Label htmlFor="description">description</Label>
                <Input
                    id="description"
                    name="description"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                />
                <Label htmlFor="amount">Amount</Label>
                <Input
                    id="amount"
                    name="amount"
                    value={data.amount}
                    onChange={(e) => setData('amount', e.target.value)}
                />
                <Label htmlFor="expense-date">Date of Expense</Label>
                <Input
                    id="expense-date"
                    name="expense-date"
                    type="date"
                    value={data.dateOfExpense}
                    onChange={(e) => setData('dateOfExpense', e.target.value)}
                />
                <Label>Paid by</Label>
                <Select
                    value={data.paidBy}
                    onValueChange={(value) => setData('paidBy', value)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select who paid for" />
                    </SelectTrigger>
                    <SelectContent>
                        {participants.map((member) => (
                            <SelectItem
                                value={member.id.toString()}
                                key={member.id}
                            >
                                {member.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Label>Split between</Label>
                <div className="divide-y divide-gray-800 border-b border-t border-gray-800">
                    {participants.map((member) => (
                        <div
                            key={member.id}
                            className="items-star-2 relative flex py-4"
                        >
                            <div className="min-w-0 flex-1 text-sm leading-6">
                                <Label
                                    htmlFor={`participant-${member.id}`}
                                    className="select-none font-medium"
                                >
                                    {member.name}
                                </Label>
                            </div>
                            <div className="ml-3 flex h-6 items-center">
                                {data.splitMethod === 'equally' ? (
                                    <Checkbox
                                        checked={data.participants.includes(
                                            member.id,
                                        )}
                                        id={`participant-${member.id}`}
                                        onCheckedChange={(isChecked) => {
                                            const value = isChecked
                                                ? [
                                                      ...data.participants,
                                                      member.id,
                                                  ]
                                                : data.participants.filter(
                                                      (participant) =>
                                                          participant !==
                                                          member.id,
                                                  );

                                            setData('participants', value);
                                        }}
                                    />
                                ) : (
                                    <Input
                                        className="text-right"
                                        id={`participant-${member.id}`}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <Label className="text-sm italic">Splitting options..</Label>
                <RadioGroup
                    value={data.splitMethod}
                    onValueChange={(value) => setData('splitMethod', value)}
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
                            <Label htmlFor={`split-opt-${option.value}`}>
                                {option.name}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>

                <Button type="submit">Create</Button>
            </form>
        </>
    );
};

export default Create;
