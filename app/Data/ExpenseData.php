<?php

namespace App\Data;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Spatie\LaravelData\Attributes\MapInputName;
use Spatie\LaravelData\Attributes\WithCast;
use Spatie\LaravelData\Attributes\WithoutValidation;
use Spatie\LaravelData\Casts\DateTimeInterfaceCast;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;
use Spatie\LaravelData\Lazy;
use Spatie\LaravelData\Mappers\CamelCaseMapper;

/**
 * @property MemberData[] $members
 */
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
        #[WithoutValidation]
        public readonly DataCollection|Lazy $members
    ) {}

    public static function fromRequest(Request $request): self
    {
        return self::from([
            ...$request->all(),
            'members' => MemberData::collect(User::whereIn('id', $request->collect('memberIds'))->get()),
        ]);
    }
}
