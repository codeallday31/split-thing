import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthenticatedLayout from '@/Layouts/authenticated-layout';
import { useForm } from '@inertiajs/react';
import { ChangeEvent, FormEvent } from 'react';

const Create = () => {
    const { data, setData } = useForm<{
        description: string;
        amount: string;
        dateOfExpense: string;
        paidFor: string[];
    }>({
        description: '',
        amount: '',
        dateOfExpense: '2024-10-23',
        paidFor: [],
    });

    const handleMultiSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = [...e.target.selectedOptions].map((o) => o.value);

        setData('paidFor', value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
                <Label>Date of Expesnse</Label>
                <select
                    multiple
                    className="dark:bg-slate-700"
                    value={data.paidFor}
                    onChange={(e) => handleMultiSelectChange(e)}
                >
                    <option value="1">Finn</option>
                    <option value="2">Melas</option>
                    <option value="3">Salir</option>
                </select>

                <Button type="submit">Save</Button>
            </form>
        </AuthenticatedLayout>
    );
};

export default Create;
