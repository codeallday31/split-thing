import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dispatch, SetStateAction, useState } from 'react';

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const FormDialog = ({ open, setOpen }: Props) => {
    const [activeTab, setActiveTab] = useState('evenly');
    const tabDescriptions = {
        evenly: 'Split the total expense amount equally between all participants',
        shares: 'Divide the expense using share ratios (e.g., 1 share, 2 shares, etc.)',
        amount: 'Specify exact amounts for each participant',
        percentage: 'Split using custom percentages for each participant',
    } as { [key: string]: string };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Splitting Options</DialogTitle>
                    <DialogDescription>
                        Choose how you want to split the expenses.
                    </DialogDescription>
                </DialogHeader>
                <Tabs
                    defaultValue="evenly"
                    className="w-full"
                    onValueChange={setActiveTab}
                >
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="evenly">Evenly</TabsTrigger>
                        <TabsTrigger value="shares">Shares</TabsTrigger>
                        <TabsTrigger value="amount">Amount</TabsTrigger>
                        <TabsTrigger value="percentage">Percentage</TabsTrigger>
                    </TabsList>
                    <div
                        className="mt-2 text-sm text-muted-foreground"
                        id="tab-description"
                        aria-live="polite"
                    >
                        {tabDescriptions[activeTab]}
                    </div>
                    <TabsContent value="shares">
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="shares">Number of Shares</Label>
                                <Input
                                    id="shares"
                                    type="number"
                                    placeholder="Enter number of shares"
                                />
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="amount">
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="amount">Amount ($)</Label>
                                <Input
                                    id="amount"
                                    type="number"
                                    placeholder="Enter amount in dollars"
                                />
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="percentage">
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="percentage">
                                    Percentage (%)
                                </Label>
                                <Input
                                    id="percentage"
                                    type="number"
                                    placeholder="Enter percentage"
                                    max="100"
                                />
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="evenly">
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="participants">
                                    Number of Participants
                                </Label>
                                <Input
                                    id="participants"
                                    type="number"
                                    placeholder="Enter number of participants"
                                    min="2"
                                />
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
                <DialogFooter>
                    <Button>Save Expense</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default FormDialog;
