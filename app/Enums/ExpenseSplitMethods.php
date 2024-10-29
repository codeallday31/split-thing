<?php

namespace App\Enums;

use App\Actions\CreateExpenseSplitAction;
use App\Models\Group\Expense;

enum ExpenseSplitMethods: string
{
    case Equally = 'equally';
    case Amount = 'amount';
    case Percentage = 'percentage';
    case Share = 'share';

    public function create(Expense $expense)
    {
        return match($this) {
            self::Equally => CreateExpenseSplitAction::execute($expense) ,
            self::Amount => dd('this is from amount'),
            self::Percentage => dd('this is from percentage'),
            self::Share => dd('this is from share'),
        };
    }
}