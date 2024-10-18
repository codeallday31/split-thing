<?php

namespace App\ViewModels;

use App\Models\Group;

final class GetGroupsViewModel extends ViewModel
{
    public function groups()
    {
        return Group::all()->map->getData();
    }

    public function countOfGroupMembers()
    {
        return Group::withCount('members')->get()->mapWithKeys(fn(Group $group) => [
            $group->id => $group->members_count
        ]);
    }
}
