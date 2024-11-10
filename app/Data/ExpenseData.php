<?php

namespace App\Data;

use App\Enums\ExpenseSplitMethod;
use App\Models\Group\Expense;
use App\Models\User;
use App\Rules\SplitMethodRule;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Validation\Rule;
use Spatie\LaravelData\Attributes\MapInputName;
use Spatie\LaravelData\Attributes\WithCast;
use Spatie\LaravelData\Attributes\WithTransformer;
use Spatie\LaravelData\Casts\DateTimeInterfaceCast;
use Spatie\LaravelData\Casts\EnumCast;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Lazy;
use Spatie\LaravelData\Mappers\CamelCaseMapper;
use Spatie\LaravelData\Support\Validation\ValidationContext;
use Spatie\LaravelData\Transformers\DateTimeInterfaceTransformer;

#[MapInputName(CamelCaseMapper::class)]
class ExpenseData extends Data
{
    /**
     * @param  Collection<int, ExpenseParticipantData>|Lazy  $participants
     */
    public function __construct(
        public readonly ?int $id,
        public readonly int $group_id,
        public readonly string $description,
        public readonly float $amount,
        #[WithCast(DateTimeInterfaceCast::class, format: 'Y-m-d')]
        #[WithTransformer(DateTimeInterfaceTransformer::class, format: 'Y-m-d')]
        public readonly Carbon $expense_date,
        #[MapInputName('payerId')]
        public readonly string|PayerData $payer,
        public readonly null|Collection|Lazy $participants,
        #[WithCast(EnumCast::class)]
        public readonly ExpenseSplitMethod $split_method,
    ) {}

    public static function fromRequest(Request $request): self
    {
        // $participants = ExpenseSplitMethod::from($request->splitMethod)->filterParticipants($request->participants);
        return self::from([
            ...$request->all(),
            'payerId' => PayerData::from(User::whereId($request->collect('payerId'))->first()),
            'participants' => ExpenseParticipantData::collect(
                $request->collect('participants')->filter(fn ($item) => $item['isSelected'])->values(), Collection::class),
        ]);
    }

    public static function fromModel(Expense $expense): self
    {
        return self::from([
            ...$expense->toArray(),
            'expense_date' => $expense->expense_date,
            'participants' => Lazy::whenLoaded(
                'splits',
                $expense,
                fn () => SplitData::collect($expense->splits)
            ),
        ]);
    }

    public static function rules(ValidationContext $context): array
    {
        return [
            'payerId' => [
                'required',
            ],
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
