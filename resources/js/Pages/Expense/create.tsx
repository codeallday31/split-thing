import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthenticatedLayout from '@/Layouts/authenticated-layout';
import { Group } from '@/types';
import { useForm } from '@inertiajs/react';
import { ChangeEvent, FormEvent } from 'react';

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
        post(route('expenses.store', model.group.id));
    };

    return (
        <AuthenticatedLayout>
            <form className="grid gap-6" onSubmit={handleSubmit}>
                <Label>description</Label>
                <Input
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                />
                <Label>Amount</Label>
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
                <Label>Member Involved</Label>
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

                <Button type="submit">Save</Button>
            </form>
        </AuthenticatedLayout>
    );
};

export default Create;
