<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class MemberData extends Data
{
    public function __construct(
        public readonly int $id,
        public readonly string $name,
        public readonly string $email
    ) {}
}
