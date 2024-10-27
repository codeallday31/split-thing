import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
        <>
            <form className="grid gap-6" onSubmit={handleSubmit}>
                <Label>description</Label>
                <Input
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                />
                <div className="flex items-center">
                    <Label>Amount</Label>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                variant="link"
                                className="text-xs italic text-muted-foreground"
                            >
                                splitting options..
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Edit profile</DialogTitle>
                                <DialogDescription>
                                    Make changes to your profile here. Click
                                    save when you're done.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="name"
                                        className="text-right"
                                    >
                                        Name
                                    </Label>
                                    <Input
                                        id="name"
                                        value="Pedro Duarte"
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="username"
                                        className="text-right"
                                    >
                                        Username
                                    </Label>
                                    <Input
                                        id="username"
                                        value="@peduarte"
                                        className="col-span-3"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Save changes</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
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

                <Button type="submit">Save</Button>
            </form>
        </>
    );
};

export default Create;
