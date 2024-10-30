<?php

namespace App\Enums;

use App\Actions\SplitMethodActions\AmountBasedAction;
use App\Actions\SplitMethodActions\EqualAction;
use App\Actions\SplitMethodActions\PercentageBasedAction;
use App\Actions\SplitMethodActions\ShareBasedAction;

enum ExpenseSplitMethod: string
{
    case Equally = 'equally';
    case Amount = 'amount';
    case Percentage = 'percentage';
    case Share = 'share';

    public function createExpenseSplit()
    {
        return match ($this) {
            self::Equally => app(EqualAction::class) ,
            self::Amount => app(AmountBasedAction::class),
            self::Percentage => app(PercentageBasedAction::class),
            self::Share => app(ShareBasedAction::class)
        };
    }
}
