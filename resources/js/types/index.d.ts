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

interface GroupRulePolicy {
    modify: boolean;
}

export interface Group {
    id: number;
    name: string;
    created_at: string;
    description: string;
    user_id: ?number;
    can: GroupRulePolicy;
    // owner: GroupOwner;
}

export interface Expense {
    id: number;
    group_id: number;
    description: string;
    amount: number;
    expense_date: string;
    payer_id: number;
    split_method: string;
    payer: string;
}
