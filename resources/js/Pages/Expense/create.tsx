import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Group } from '@/types';
import { useForm } from '@inertiajs/react';
import { ChangeEvent, FormEvent, useState } from 'react';
import FormDialog from './partials/form-dialog';

interface Member {
    id: number;
    name: string;
}

interface IGroup extends Group {
    members: Member[];
}

interface Props {
    model: {
        group: IGroup;
    };
}

const Create = ({ model }: Props) => {
    const [open, setOpen] = useState(false);
    const { data, setData, post, transform } = useForm<{
        description: string;
        amount: string;
        dateOfExpense: string;
        memberIds: string[];
    }>({
        description: '',
        amount: '',
        dateOfExpense: '2024-10-23',
        memberIds: [],
    });

    const handleMultiSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = [...e.target.selectedOptions].map((o) => o.value);
        setData('memberIds', value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        transform((data) => ({
            ...data,
            groupId: model.group.id,
        }));
        post(route('expenses.store', model.group.id), {
            onSuccess: () => {
                setOpen(true);
            },
        });
    };

    return (
        <>
            <form className="grid gap-6" onSubmit={handleSubmit}>
                <Label>description</Label>
                <Input
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                />
                <div className="flex items-center">
                    <Label>Amount</Label>
                </div>
                <Input
                    value={data.amount}
                    onChange={(e) => setData('amount', e.target.value)}
                />
                <Label>Date of Expense</Label>
                <Input
                    type="date"
                    value={data.dateOfExpense}
                    onChange={(e) => setData('dateOfExpense', e.target.value)}
                />
                {/* <Text> */}
                <Label>Split between</Label>
                <select
                    multiple
                    className="dark:bg-slate-700"
                    value={data.memberIds}
                    onChange={(e) => handleMultiSelectChange(e)}
                >
                    {model.group.members.map((member) => (
                        <option value={member.id} key={member.id}>
                            {member.name}
                        </option>
                    ))}
                </select>

                <Button type="submit">Create</Button>
            </form>
            <FormDialog open={open} setOpen={setOpen} />
        </>
    );
};

export default Create;
