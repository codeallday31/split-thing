<?php

namespace App\Actions;

use App\Data\ExpenseData;
use App\Models\Group\Expense;

class UpsertExpenseAction
{
    public static function execute(ExpenseData $data): Expense
    {
        $expense = Expense::updateOrCreate(
            [
                'id' => $data->id,
            ],
            [
                'group_id' => $data->group_id,
                'description' => $data->description,
                'amount' => $data->amount,
                'expense_date' => $data->expense_date,
                'payer_id' => $data->payer->id,
                'split_method' => $data->split_method,
            ]
        );

        $expense->splits->each->delete();

        CreateExpenseSplits::execute($expense, $data);

        return $expense;
    }
}
