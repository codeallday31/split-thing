<?php

namespace App\Data;

use App\Enums\ExpenseSplitMethod;
use App\Rules\SplitMethodRule;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Validation\Rule;
use Spatie\LaravelData\Attributes\MapInputName;
use Spatie\LaravelData\Attributes\WithCast;
use Spatie\LaravelData\Casts\DateTimeInterfaceCast;
use Spatie\LaravelData\Casts\EnumCast;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\CamelCaseMapper;
use Spatie\LaravelData\Support\Validation\ValidationContext;

#[MapInputName(CamelCaseMapper::class)]
class ExpenseData extends Data
{
    /**
     * @param  Collection<int, ExpenseParticipantData>  $participants
     */
    public function __construct(
        public readonly ?int $expense_id,
        public readonly int $group_id,
        public readonly string $description,
        public readonly float $amount,
        #[WithCast(DateTimeInterfaceCast::class, format: 'Y-m-d')]
        public readonly Carbon $expense_date,
        public readonly int $payer_id,
        #[WithCast(EnumCast::class)]
        public readonly ExpenseSplitMethod $split_method,
        public readonly Collection $participants
    ) {}

    public static function fromRequest(Request $request): self
    {
        $participants = ExpenseSplitMethod::from($request->splitMethod)->filterParticipants($request->participants);

        return self::from([
            ...$request->all(),
            'participants' => $participants,
        ]);
    }

    public static function rules(ValidationContext $context): array
    {
        return [
            'participants' => [
                'array',
                'required',
                Rule::when(
                    is_numeric($context->fullPayload['amount']),
                    new SplitMethodRule
                ),
            ],
        ];
    }
}
