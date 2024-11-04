<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class SplitData extends Data
{
    public function __construct(
        public readonly int $id,
        public readonly int $expense_id,
        public readonly float $amount,
    ) {}
}
