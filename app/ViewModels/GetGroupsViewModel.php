<?php

namespace App\ViewModels;

use App\Data\GroupData;
use App\Models\Group;
use App\Models\User;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;

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
            ->get()->map->getdata();
    }

    // public function test()
    // {
    //     return User::with([
    //         'created_groups:id,user_id,name,description,created_at',
    //         'groups:id,user_id,name,description,created_at',
    //     ])->where('users.id', auth()->user()->id)->get()->map->getData();
    //     // return User::query()->whereId(auth()->user()->id)
    //     // ->with(['groups', 'created_groups'])
    //     // ->get()
    //     // ->map
    //     // ->getData();
    // }
    public function hasGroups(): bool
    {
        return auth()->user()->created_groups()->count() >= 1;
    }
}
