<?php

namespace App\Actions\SplitMethodActions;

use App\Data\ExpenseData;
use App\Models\Group\Expense;

class EqualAction
{
    public function __invoke(Expense $expense, ExpenseData $data)
    {
        $amountInCents = round($data->amount * 100);
        $splitAmountInCents = floor($amountInCents / $data->participants->count());

        $splitAmount = round($splitAmountInCents / 100, 2);

        $expense->splits()->createMany(
            $data->participants->map(fn ($participant) => [
                'user_id' => $participant->id,
                'amount' => $splitAmount,
            ]),
        );
    }
}
