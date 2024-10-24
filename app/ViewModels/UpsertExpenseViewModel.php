<?php

namespace App\ViewModels;

use App\Models\Group;
use App\Models\Group\Expense;

class UpsertExpenseViewModel extends ViewModel
{
    public function __construct(
        public readonly Group $group,
        public readonly ?Expense $expense = null,
    ) {
    }

    public function group()
    {
        return $this->group->load('members')->getData();
    }
}