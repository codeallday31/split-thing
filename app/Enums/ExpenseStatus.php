<?php

namespace App\Enums;

enum ExpenseStatus: string
{
    case Lent = 'lent';
    case Borrowed = 'borrowed';
    case Not_Involved = 'not involved';
}
