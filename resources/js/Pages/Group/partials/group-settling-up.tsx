import {
    Button,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui';
import { Member } from '@/types';

interface Props {
    participants: Member[];
}

export default function GroupSettlingUp({ participants }: Props) {
    return (
        <Card>
            <CardHeader className="border-b-orange-50">
                <CardTitle>Settling Up Debts Between Participants</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    {participants.map((participant) => (
                        <div className="flex items-center" key={participant.id}>
                            <div className="space-y-1">
                                <span className="text-sm font-medium leading-none">
                                    {participant.name} owes blah blah
                                </span>
                                <Button
                                    variant="link"
                                    className="text-green-500"
                                >
                                    Make Payment
                                </Button>
                            </div>
                            <div className="ml-auto font-medium">0</div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
