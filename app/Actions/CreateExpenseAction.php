<?php

namespace App\Actions;

use App\Data\ExpenseData;
use App\Data\SplitData;
use App\Data\UserData;
use App\Models\Group\Expense;
use App\Models\User;

class CreateExpenseAction
{
    public static function execute(ExpenseData $data): Expense
    {
        $expense = Expense::updateOrCreate(
            [
                'id' => $data->expense_id,
            ],
            [
                'group_id' => $data->group_id,
                'description' => $data->description,
                'amount' => $data->amount,
                'expense_date' => $data->expense_date,
                'payer_id' => $data->payer_id,
                'split_method' => $data->split_method,
            ]
        );

        $expense->splits->each->delete();

        $splitMethod = $data->split_method->createExpenseSplit();
        $splitMethod($expense, SplitData::from([
            ...$data->toArray(),
            'participants' => UserData::collect(User::whereIn('id', $data->participants)->get()),
        ]));

        return $expense->load('group');
    }
}
