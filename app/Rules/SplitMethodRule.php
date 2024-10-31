<?php

namespace App\Rules;

use App\Data\ExpenseParticipantData;
use App\Enums\ExpenseSplitMethod;
use Closure;
use Illuminate\Contracts\Validation\DataAwareRule;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Collection;

class SplitMethodRule implements DataAwareRule, ValidationRule
{
    /**
     * All of the data under validation.
     *
     * @var array<string, mixed>
     */
    protected $data = [];

    /**
     * Set the data under validation.
     *
     * @param  array<string, mixed>  $data
     */
    public function setData(array $data): static
    {
        $this->data = $data;

        return $this;
    }

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $totalParticipantsValue = ExpenseParticipantData::collect($value, Collection::class)
            ->filter(fn ($particpant) => $particpant->is_selected)
            ->sum('value');

        if (ExpenseSplitMethod::from($this->data['splitMethod']) === ExpenseSplitMethod::Amount) {
            if ($this->convertValue($totalParticipantsValue) !== $this->convertValue($this->data['amount'])) {
                $fail('Total amounts does not match the total expense amount');
            }
        } elseif (ExpenseSplitMethod::from($this->data['splitMethod']) === ExpenseSplitMethod::Percentage) {
            if ($totalParticipantsValue !== floatval(100)) {
                $fail('Total percentage must equal to 100%');
            }
        }
    }

    private static function convertValue(float $amount): int
    {
        return round($amount * 100);
    }
}
