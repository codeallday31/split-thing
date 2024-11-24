<?php

namespace App\Data;

use Spatie\LaravelData\Attributes\MapInputName;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\CamelCaseMapper;

#[MapInputName(CamelCaseMapper::class)]
class ExpenseParticipantData extends Data
{
    public function __construct(
        public readonly int $id,
        public readonly string $name,
        public readonly bool $is_selected,
        public readonly int $shares,
    ) {}
}
