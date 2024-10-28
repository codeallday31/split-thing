<?php

namespace App\Policies;

use App\Models\Group;
use App\Models\User;

class ExpensePolicy
{
    /**
     * Determine whether the user can create models.
     */
    public function create(User $user, Group $group): bool
    {
        return $user->id === $group->user_id;
    }
}
