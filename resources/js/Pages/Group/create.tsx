import InputError from '@/Components/InputError';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MultiSelect } from '@/components/ui/multi-select';
import { Textarea } from '@/components/ui/textarea';
import AuthenticatedLayout from '@/Layouts/authenticated-layout';
import { Group } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

interface GroupCreateState {
    id: number | null;
    name: string;
    description: string;
    memberIds: string[];
}

interface IUser {
    value: string;
    label: string;
}

interface IMember extends Group {
    memberIds: string[];
}

interface Props {
    model: {
        users: IUser[];
        group: IMember;
    };
}

export default function Create({ model }: Props) {
    const { data, setData, post, errors, put } = useForm<GroupCreateState>({
        id: model.group?.id,
        name: model.group?.name ?? '',
        description: model.group?.description ?? '',
        memberIds: model.group?.memberIds ?? [],
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (model.group) {
            put(route('groups.update', model.group.id));
        } else {
            post(route('groups.store'));
        }
    };

    const handleMultiSelectChange = (value: string[]) => {
        setData('memberIds', value);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Group" />
            <div>
                <form className="grid gap-6" onSubmit={handleSubmit}>
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
                                        setData('name', e.target.value)
                                    }
                                    value={data.name}
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="content">Description</Label>
                                <Textarea
                                    id="content"
                                    placeholder="blah blah blah.."
                                    rows={5}
                                    onChange={(e) =>
                                        setData(
                                            'description',
                                            e.currentTarget.value,
                                        )
                                    }
                                    value={data.description}
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
                            <MultiSelect
                                options={model.users}
                                onValueChange={handleMultiSelectChange}
                                defaultValue={data.memberIds}
                                placeholder="Select members"
                                variant="inverted"
                                maxCount={3}
                            />
                        </CardContent>
                    </Card>
                    <div>
                        <Button type="submit">Save</Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
