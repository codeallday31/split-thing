<?php

namespace App\Actions;

use App\Data\ExpenseData;
use App\Models\Group\Expense;

class CreateExpenseSplitByAmountAction
{
    public function __invoke(Expense $expense, ExpenseData $data)
    {
        $expenseDistribution = $data->participants
            ->filter(fn ($participant) => $participant->is_selected)
            ->map(fn ($participant) => [
                'user_id' => $participant->id,
                'amount' => $participant->value,
            ]);

        $expense->splits()->createMany($expenseDistribution);
    }
}
