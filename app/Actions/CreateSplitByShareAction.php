<?php

namespace App\Actions;

use App\Data\ExpenseData;
use App\Data\ExpenseParticipantData;
use App\Models\Group\Expense;

class CreateSplitByShareAction
{
    public function __invoke(Expense $expense, ExpenseData $data)
    {
        $participants = $data->participants->filter(fn ($participant) => $participant->is_selected);

        $totalShares = $participants->sum(fn ($particpant) => $particpant->value);

        $expenseDistribution = $participants
            ->map(fn ($participant) => [
                'user_id' => $participant->id,
                'amount' => $this->calculate($expense->amount, $totalShares, $participant),
            ]);

        $expense->splits()->createMany($expenseDistribution);
    }

    private function calculate(float $amount, float $totalShares, ExpenseParticipantData $participant): float
    {
        $amountInCents = round($amount * 100);
        $splitAmountInCents = ($participant->value / $totalShares) * $amountInCents;

        return round($splitAmountInCents / 100, 2);
    }
}
