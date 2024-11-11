<?php

namespace App\Actions\SplitMethodActions;

use App\Data\ExpenseData;
use App\Models\Group\Expense;

class EqualAction
{
    public function __invoke(Expense $expense, ExpenseData $data)
    {
        $involvedMembers = $data->participants->filter(fn ($participant) => $participant->is_selected)->values();

        $amountInCents = round($data->amount * 100);
        $splitAmountInCents = round($amountInCents / $involvedMembers->count());

        $splitAmount = round($splitAmountInCents / 100, 2);

        $expense->splits()->createMany(
            $data->participants->map(fn ($participant) => [
                'user_id' => $participant->id,
                'amount' => $participant->is_payer ? $participant->value : $splitAmount,
            ]),
        );
    }
}
