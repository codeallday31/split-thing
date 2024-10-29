<?php

namespace App\Data;

use Illuminate\Support\Collection;
use Spatie\LaravelData\Data;

class SplitData extends Data
{
    /**
     * @param  Collection<int, UserData>  $participants
     */
    public function __construct(
        public readonly float $amount,
        public readonly Collection $participants
    ) {}
}
