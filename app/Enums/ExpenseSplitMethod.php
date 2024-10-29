<?php

namespace App\Enums;

use App\Actions\CreateEqualSplitAction;

enum ExpenseSplitMethod: string
{
    case Equally = 'equally';
    case Amount = 'amount';
    case Percentage = 'percentage';
    case Share = 'share';

    public function createExpenseSplit()
    {
        return match ($this) {
            self::Equally => app(CreateEqualSplitAction::class) ,
            self::Amount => dd('this is from amount'),
            self::Percentage => dd('this is from percentage'),
            self::Share => dd('this is from share'),
        };
    }
}
