<?php

namespace App\ViewModels;

use App\Data\GroupData;
use App\Models\Group;
use App\Models\User;
use Illuminate\Support\Collection;

final class GetGroupsViewModel extends ViewModel
{
    /**
     * @return Collection<GroupData>
     */
    public function groups(): Collection
    {

        return Group::all()->map->getData();
        // return Group::whereId(auth()->user()->id)->get()->map->getData();
    }

    // public function test()
    // {
    //     return User::query()->whereId(auth()->user()->id)
    //     ->with(['groups', 'created_groups'])
    //     ->get()
    //     ->map
    //     ->getData();
    // }

    public function countOfGroupMembers(): Collection
    {
        return Group::withCount('members')->get()->mapWithKeys(fn (Group $group) => [
            $group->id => $group->members_count,
        ]);
    }

    public function hasGroups(): bool
    {
        return auth()->user()->created_groups()->count() >= 1;
    }
}
