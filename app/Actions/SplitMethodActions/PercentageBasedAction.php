<?php

namespace App\Actions\SplitMethodActions;

use App\Data\ExpenseData;
use App\Data\ExpenseParticipantData;
use App\Models\Group\Expense;

class PercentageBasedAction
{
    public function __invoke(Expense $expense, ExpenseData $data)
    {
        $expense->splits()->createMany(
            $data->participants->map(fn ($participant) => [
                'user_id' => $participant->id,
                'amount' => $this->calculate($expense->amount, $participant),
            ]),
        );
    }

    private function calculate(float $amount, ExpenseParticipantData $participant): float
    {
        $amountInCents = round($amount * 100);
        $splitAmountInCents = ($participant->value / 100) * $amountInCents;

        return round($splitAmountInCents / 100, 2);
    }
}