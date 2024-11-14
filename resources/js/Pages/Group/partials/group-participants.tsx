import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Member } from '@/types';

interface Props {
    participants: Member[];
}

export default function GroupParticipants({ participants }: Props) {
    return (
        <Card>
            <CardHeader className="border-b-orange-50">
                <CardTitle>Friends/Group Participants</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    {participants.map((participant) => (
                        <div className="flex items-center" key={participant.id}>
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    {participant.name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {participant.email}
                                </p>
                            </div>
                            {/* <div className="ml-auto font-medium">0</div> */}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
