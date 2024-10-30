<?php

namespace App\Actions;

use App\Data\ExpenseData;
use App\Data\ExpenseParticipantData;
use App\Models\Group\Expense;

class CreateSplitByPercentageAction
{
    public function __invoke(Expense $expense, ExpenseData $data)
    {
        $expenseDistribution = $data->participants
            ->filter(fn ($participant) => $participant->is_selected)
            ->map(fn ($participant) => [
                'user_id' => $participant->id,
                'amount' => $this->calculate($expense->amount, $participant),
            ]);

        $expense->splits()->createMany($expenseDistribution);
    }

    private function calculate(float $amount, ExpenseParticipantData $participant): float
    {
        $amountInCents = round($amount * 100);
        $splitAmountInCents = ($participant->value / 100) * $amountInCents;

        return round($splitAmountInCents / 100, 2);
    }
}
