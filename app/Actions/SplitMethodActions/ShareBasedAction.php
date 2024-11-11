<?php

namespace App\Actions\SplitMethodActions;

use App\Data\ExpenseData;
use App\Data\ExpenseParticipantData;
use App\Models\Group\Expense;

class ShareBasedAction
{
    public function __invoke(Expense $expense, ExpenseData $data)
    {
        $totalShares = $data->participants->sum(fn ($particpant) => $particpant->value);

        $expense->splits()->createMany(
            $data->participants->map(fn ($participant) => [
                'user_id' => $participant->id,
                'amount' => $this->calculate($expense->amount, $totalShares, $participant),
            ]),
        );
    }

    private function calculate(float $amount, float $totalShares, ExpenseParticipantData $participant): float
    {
        $amountInCents = round($amount * 100);
        $splitAmountInCents = round(($participant->value / $totalShares) * $amountInCents, 2);

        return round($splitAmountInCents / 100, 2);
    }
}
