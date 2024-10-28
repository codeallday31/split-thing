<?php

namespace App\Enums;

enum ExpenseStatus: string
{
    case Pending = 'pending';
    case Posted = 'posted';
}
