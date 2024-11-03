<?php

namespace App\Actions;

use App\Data\GroupData;
use App\Models\Group;
use App\Models\User;

class UpsertGroupAction
{
    public static function execute(GroupData $data, User $user): void
    {
        $group = Group::updateOrCreate(
            [
                'id' => $data->id,
            ], [
                ...$data->all(),
                'user_id' => $user->id,
            ]);

        $group->members()->sync($data->members->pluck('id'));

    }
}
