<?php

namespace App\Actions;

use App\Data\SplitData;
use App\Data\UserData;
use App\Models\Group\Expense;

class CreateEqualSplitAction
{
    public function __invoke(Expense $expense, SplitData $data)
    {
        $amountInCents = round($data->amount * 100);
        $splitAmountInCents = floor($amountInCents / count($data->participants));

        $amount = round($splitAmountInCents / 100, 2);

        $expenseDistribution = $data->participants->map(fn (UserData $participant) => [
            'user_id' => $participant->id,
            'amount' => $amount,
        ]);

        $expense->splits()->createMany($expenseDistribution->toArray());
    }
}
