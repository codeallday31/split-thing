import { Button } from '@/Components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import AuthenticatedLayout from '@/Layouts/authenticated-layout';
import { Head, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

interface IGroupMember {
    id: number;
    name: string;
}

interface GroupCreateState {
    groupName: string;
    groupDescription: string;
    groupMembers: IGroupMember[];
}

const randomNumber = () => {
    return Math.floor(Math.random() * 1000);
};

export default function Create() {
    const { data, setData } = useForm<GroupCreateState>({
        groupName: '',
        groupDescription: '',
        groupMembers: [],
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(data);
    };

    const handleAddMember = (id: number) => {
        const members = [...data.groupMembers, { id, name: '' }];

        setData('groupMembers', members);
    };

    const handleMemberChange = (id: number, value: string) => {
        const members = data.groupMembers.map((member) =>
            member.id === id ? { ...member, name: value } : member,
        );

        setData('groupMembers', members);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Group" />
            <div>
                <form className="grid gap-6" onSubmit={handleSubmit}>
                    <div>
                        <Button>Save</Button>
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                <span className="text-lg">Group details</span>
                            </CardTitle>
                            <CardDescription>
                                Provide the basic details about the group, such
                                as the name and a brief description.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="group-name">Group name</Label>
                                <Input
                                    id="group-name"
                                    placeholder="trip to ..."
                                    onChange={(e) =>
                                        setData('groupName', e.target.value)
                                    }
                                    value={data.groupName}
                                />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="content">Description</Label>
                                <Textarea
                                    id="content"
                                    placeholder="blah blah blah.."
                                    rows={5}
                                    onChange={(e) =>
                                        setData(
                                            'groupDescription',
                                            e.currentTarget.value,
                                        )
                                    }
                                    value={data.groupDescription}
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Group Members</CardTitle>
                            <CardDescription>
                                Manage the members of the group by adding or
                                removing participants.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            {data.groupMembers.map(({ id, name }) => (
                                <div className="grid gap-3" key={id}>
                                    <Input
                                        value={name}
                                        onChange={(e) =>
                                            handleMemberChange(
                                                id,
                                                e.target.value,
                                            )
                                        }
                                    />
                                </div>
                            ))}
                        </CardContent>
                        <CardFooter className="border-t px-6 py-4">
                            <Button
                                onClick={() => handleAddMember(randomNumber())}
                            >
                                Add Member
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
