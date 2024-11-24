<?php

namespace App\Actions\SplitMethodActions;

use App\Data\ExpenseData;
use App\Models\Group\Expense;

class EqualAction
{
    public function __invoke(Expense $expense, ExpenseData $data)
    {
        $expense->splits()->createMany(
            $data->participants->map(fn ($participant) => [
                'user_id' => $participant->id,
                'shares' => $participant->shares,
            ]),
        );
    }
}
