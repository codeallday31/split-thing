<?php

namespace App\Enums;

use App\Actions\CreateEqualSplitAction;
use App\Actions\CreateExpenseSplitByAmountAction;
use App\Actions\CreateSplitByPercentageAction;
use App\Actions\CreateSplitByShareAction;

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
            self::Amount => app(CreateExpenseSplitByAmountAction::class),
            self::Percentage => app(CreateSplitByPercentageAction::class),
            self::Share => app(CreateSplitByShareAction::class)
        };
    }
}
