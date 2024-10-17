<?php

namespace App\ViewModels;

use App\Data\UserData;
use App\Models\Group;
use App\Models\User;
use Illuminate\Support\Collection;

class UpsertGroupViewModel extends ViewModel
{
    public function __construct(
        public readonly ?Group $group = null
    ){}
    public function users(): Collection
    {
       return User::query()->where('id', '!=', auth()->id())->get()->map(fn (User $user) => [
        'value' => strval($user->id),
        'label' => $user->name
       ] );
    }
}