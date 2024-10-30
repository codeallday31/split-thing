<?php

namespace App\Actions\SplitMethodActions;

use App\Data\ExpenseData;
use App\Models\Group\Expense;

class EqualAction
{
    public function __invoke(Expense $expense, ExpenseData $data)
    {
        $participants = $data->participants->filter(fn ($participant) => $participant->is_selected);

        $amountInCents = round($data->amount * 100);
        $splitAmountInCents = floor($amountInCents / $participants->count());

        $splitAmount = round($splitAmountInCents / 100, 2);

        $expenseDistribution = $participants->map(fn ($participant) => [
            'user_id' => $participant->id,
            'amount' => $splitAmount,
        ]);

        $expense->splits()->createMany($expenseDistribution->toArray());
    }
}
