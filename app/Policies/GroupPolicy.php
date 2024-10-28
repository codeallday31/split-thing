<?php

namespace App\Policies;

use App\Models\Group;
use App\Models\User;

class GroupPolicy
{
    public function modify(User $user, Group $group): bool
    {
        return $user->id === $group->user_id;
    }
}
