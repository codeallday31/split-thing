<?php

namespace App\Policies;

use App\Models\Group;
use App\Models\User;

class GroupPolicy
{
    public function createExpense(User $user, Group $group): bool
    {
        return $user->id === $group->user_id;
    }

    public function create(User $user): bool
    {
        return true;
    }
}
