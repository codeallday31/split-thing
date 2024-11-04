<?php

namespace App\ViewModels;

use App\Data\GroupData;
use App\Models\Group;

final class GetGroupsViewModel extends ViewModel
{
    // /**
    //  * @return Collection<GroupData>
    //  */
    // public function groups(): Collection
    // {
    //     return Group::query()->whereUserId(auth()->user()->id)->get()->map->getData();
    // }

    // public function joinedGroups()
    // {
    //     $groups = Group::whereHas('members', function ($query) {
    //         $query->where('user_id', auth()->user()->id);
    //     })->get()->map->getData();

    //     return $groups;
    // }

    public function groups()
    {
        return Group::query()->where(function ($query) {
            return $query->whereUserId(auth()->user()->id)
                ->orWhereHas('members', function ($q) {
                    return $q->where('user_id', auth()->user()->id);
                });
        })
            ->get()->map(fn (Group $group) => GroupData::from($group)->except('members'));
    }

    public function hasGroups(): bool
    {
        return auth()->user()->created_groups()->count() >= 1;
    }
}
