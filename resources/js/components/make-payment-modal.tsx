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
import { useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

interface Props {
    amount: number;
}

export default function MakePaymentModal({ amount }: Props) {
    const { data, setData } = useForm<{ amount: string | number }>({
        amount: String(amount / 100) as unknown as number,
    });
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link" className="text-green-500">
                    Make Payment
                </Button>
            </DialogTrigger>
            <DialogContent
                className="sm:max-w-[425px]"
                onOpenAutoFocus={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle>Make A Payment</DialogTitle>
                    <DialogDescription>
                        Clear pending amounts and keep your accounts balanced.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name">Amount</Label>
                            <Input
                                className="col-span-3"
                                type="number"
                                id="amount"
                                name="amount"
                                min={0}
                                step={0.01}
                                value={data.amount}
                                autoFocus
                                onChange={(e) => {
                                    setData('amount', e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Pay</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
