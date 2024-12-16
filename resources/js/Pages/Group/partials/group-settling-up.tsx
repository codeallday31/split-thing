import MakePaymentModal from '@/components/make-payment-modal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { Member, Repayment } from '@/types';

interface Props {
    participants: Member[];
    repayments: Repayment[];
}

export default function GroupSettlingUp({ participants, repayments }: Props) {
    const getParticipant = (id: number) =>
        participants.find((p) => p.id === id);

    return (
        <Card>
            <CardHeader className="border-b-orange-50">
                <CardTitle>Settling Up Debts Between Participants</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    {repayments.map((repayment, index) => (
                        <div className="flex items-center" key={index}>
                            <div className="space-y-1">
                                <span className="text-sm font-medium leading-none">
                                    {`${getParticipant(repayment.from)?.name} owes ${getParticipant(repayment.to)?.name}`}
                                </span>
                                <MakePaymentModal amount={repayment.amount} />
                            </div>
                            <div className="ml-auto font-medium">
                                {formatCurrency(repayment.amount)}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
