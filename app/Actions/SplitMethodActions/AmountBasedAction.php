<?php

namespace App\Actions\SplitMethodActions;

use App\Data\ExpenseData;
use App\Models\Group\Expense;

class AmountBasedAction
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
