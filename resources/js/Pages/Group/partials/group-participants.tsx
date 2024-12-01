import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { cn } from '@/lib/utils';
import { ExpenseSummary, Member } from '@/types';

interface Props {
    participants: Member[];
    balances: { [key: number]: ExpenseSummary };
}

export default function GroupParticipants({ participants, balances }: Props) {
    return (
        <Card>
            <CardHeader className="border-b-orange-50">
                <CardTitle>Friends/Group Participants</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    {participants.map((participant) => {
                        const balance = balances[participant.id]?.balance ?? 0;
                        const isRecievable = balance > 0;
                        return (
                            <div
                                className="flex items-center"
                                key={participant.id}
                            >
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        {participant.name}
                                    </p>
                                </div>
                                <div
                                    className={cn(
                                        'ml-auto font-medium',
                                        isRecievable
                                            ? 'text-green-500'
                                            : balance !== 0 && 'text-red-500',
                                    )}
                                >
                                    {balance}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
