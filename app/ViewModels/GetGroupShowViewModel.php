<?php

namespace App\ViewModels;

use App\Models\Group;
use App\Models\Group\Expense;

class GetGroupShowViewModel extends ViewModel
{
    public function __construct(
        public readonly Group $group
    ) {}

    public function group()
    {
        return $this->group->getData();
    }

    public function expenses()
    {
        return Expense::query()->where('group_id', $this->group->id)->with('payer')->get()->map->getData();
    }
}
