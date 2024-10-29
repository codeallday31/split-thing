<?php

namespace App\Actions;

use App\Models\Group\Expense;

class CreateExpenseSplitAction
{
    public static function execute(Expense $expense)
    {
        dd($expense);
    }
}
