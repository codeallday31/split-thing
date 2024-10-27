export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};

// interface GroupOwner {
//     id: number;
//     name: string;
// }

interface Group {
    id: number;
    name: string;
    created_at: string;
    description: string;
    user_id: ?number;
    // owner: GroupOwner;
}
