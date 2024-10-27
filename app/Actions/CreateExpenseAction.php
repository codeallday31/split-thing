<?php

namespace App\Actions;

use App\Data\ExpenseData;
use App\Models\Group\Expense;

class CreateExpenseAction
{
    public static function execute(ExpenseData $data)
    {
        $expense = Expense::create([
            'group_id' => $data->group_id,
            'description' => $data->description,
            'amount' => $data->amount,
            'expense_date' => $data->date_of_expense,
        ]);

        $splits = collect($data->member_ids)->map(function ($id) use ($data): array {
            return [
                'user_id' => $id,
                'amount' => $data->amount / (count($data->member_ids) + 1),
            ];
        });

        $expense->splits()->createMany($splits->toArray());
    }
}
