<?php

namespace App\Enums;

enum ExpenseSplitMethod: string
{
    case Equally = 'equally';
    case Amount = 'amount';
    case Percentage = 'percentage';
    case Share = 'share';
}
