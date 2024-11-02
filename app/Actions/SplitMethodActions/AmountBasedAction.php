<?php

namespace App\Actions\SplitMethodActions;

use App\Data\ExpenseData;
use App\Models\Group\Expense;

class AmountBasedAction
{
    public function __invoke(Expense $expense, ExpenseData $data)
    {
        $expense->splits()->createMany(
            $data->participants->map(fn ($participant) => [
                'user_id' => $participant->id,
                'amount' => $participant->value,
            ]),
        );
    }
}
