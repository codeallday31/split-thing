<?php

namespace App\Actions;

use App\Data\ExpenseData;
use App\Models\Group\Expense;

class CreateExpenseSplits
{
    public static function execute(Expense $expense, ExpenseData $data)
    {
        $expense->splits()->createMany(
            $data->participants->map(fn ($participant) => [
                'user_id' => $participant->id,
                'shares' => $participant->shares,
            ]),
        );
    }
}
