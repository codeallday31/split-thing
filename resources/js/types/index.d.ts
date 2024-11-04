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

interface Member {
    id: number;
    name: string;
}

export type GroupRecord = Omit<Group, 'members'>;
export type GroupCreate = Omit<Group, 'created_at' | 'can'>;

export interface GroupRulePolicy {
    modify: boolean;
}

export interface Group {
    id: number;
    name: string;
    description: string;
    members: Member[];
    created_at: string;
    can: GroupRulePolicy;
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
