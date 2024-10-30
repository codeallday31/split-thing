<?php

namespace App\Actions;

use App\Data\ExpenseData;
use App\Data\SplitData;
use App\Data\UserData;
use App\Models\Group\Expense;

class CreateEqualSplitAction
{
    public function __invoke(Expense $expense, ExpenseData $data)
    {
        $amountInCents = round($data->amount * 100);
        $splitAmountInCents = floor($amountInCents / $data->participants->count());

        $splitAmount = round($splitAmountInCents / 100, 2);

        $expenseDistribution = $data->participants->map(fn ($participant) => [
            'user_id' => $participant->id,
            'amount' => $splitAmount
        ]);

        $expense->splits()->createMany($expenseDistribution->toArray());
    }
}
