<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class ExpenseData extends Data
{
    public function __construct(
      public readonly int $group_id,
      public readonly string $description,
      public readonly int $amount,
    ) {}
}