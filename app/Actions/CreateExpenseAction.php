<?php

namespace App\Actions;

use App\Data\ExpenseData;
use App\Models\Group\Expense;

class CreateExpenseAction
{
    public static function execute(ExpenseData $data)
    {
        // dd($data->split_method->create());
        $expense = Expense::updateOrCreate(
            [
                'group_id' => $data->group_id,
            ], [
                'description' => $data->description,
                'amount' => $data->amount,
                'expense_date' => $data->date_of_expense,
            ]);

        dump($expense);
        dump(Expense::whereId($expense->id)->first());
        dd('finished');

        // $data->split_method->create($expense);

        // $splits = collect($data->member_ids)->map(function ($id): array {
        //     return [
        //         'user_id' => $id,
        //         'amount' => 0,
        //     ];
        // });

        // $expense->splits()->createMany($splits->toArray());
    }
}
