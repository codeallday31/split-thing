<?php

namespace App\Data;

use Carbon\Carbon;
use Spatie\LaravelData\Attributes\MapInputName;
use Spatie\LaravelData\Attributes\WithCast;
use Spatie\LaravelData\Casts\DateTimeInterfaceCast;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\CamelCaseMapper;

#[MapInputName(CamelCaseMapper::class)]
class ExpenseData extends Data
{
    public function __construct(
        public readonly int $group_id,
        public readonly string $description,
        public readonly int $amount,
        #[WithCast(DateTimeInterfaceCast::class, format: 'Y-m-d')]
        public readonly Carbon $date_of_expense,
        public readonly array $member_ids,
        // #[WithoutValidation]
        // public readonly DataCollection|Lazy $members
    ) {}
}
