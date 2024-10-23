<?php

namespace App\ViewModels;

use App\Models\Group;

class GetGroupShowViewModel extends ViewModel
{
    public function __construct(
        public readonly Group $group
    ) {}

    public function group()
    {
        return $this->group->load('members')->getData();
    }
}
