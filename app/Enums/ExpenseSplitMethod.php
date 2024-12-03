<?php

namespace App\Enums;

use App\Actions\SplitMethodActions\EqualAction;
use App\Actions\SplitMethodActions\PercentageBasedAction;
use App\Actions\SplitMethodActions\ShareBasedAction;
use App\Data\ExpenseParticipantData;
use Illuminate\Support\Collection;

enum ExpenseSplitMethod: string
{
    case Equally = 'equally';
    case Amount = 'amount';
    case Percentage = 'percentage';
    case Share = 'share';
}
