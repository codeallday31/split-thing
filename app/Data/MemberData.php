<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class MemberData extends Data
{
    public function __construct(
        public readonly int $id,
        public readonly string $name
    ) {}

    public static function fromRequest()
    {
        dd('this is from request member data');
    }
}
