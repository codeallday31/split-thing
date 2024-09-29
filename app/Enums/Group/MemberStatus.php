<?php

namespace App\Enums\Group;

enum MemberStatus: string
{
    case Paid = 'paid';
    case Unpaid = 'unpaid';
}
