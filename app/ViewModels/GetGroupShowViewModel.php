<?php

namespace App\ViewModels;

use App\Models\ExpenseSplit;
use App\Models\Group;
use App\Models\Group\Expense;

class GetGroupShowViewModel extends ViewModel
{
    public function __construct(
        public readonly Group $group
    ) {}

    public function group()
    {
        return $this->group->getData();
    }

    public function expenses()
    {
        return Expense::query()
            ->where('group_id', $this->group->id)
            ->with(['payer'])
            ->orderBy('expense_date', 'asc')
            ->get()
            ->map->getData();
    }

    // public function amounts()
    // {
    //     return ExpenseSplit::query()
    //         ->where('user_id', '=', auth()->user()->id)
    //         ->get()
    //         ->mapWithKeys(function ($item) {
    //             return [$item->expense_id => $item->amount];
    //         });
    // }

    public function amounts()
    {
        $query = ExpenseSplit::selectRaw('
        expenses.id,
        CASE
        WHEN expenses.payer_id = ? THEN (
            SELECT SUM(amount)
            FROM expense_splits as inner_splits
            WHERE inner_splits.expense_id = expense_splits.expense_id
            AND inner_splits.user_id != ?
        )
        ELSE expense_splits.amount
    END as amount
', [auth()->id(), auth()->id()])
            ->join('expenses', 'expense_splits.expense_id', '=', 'expenses.id')
            ->where('expense_splits.user_id', auth()->id());

        return $query->get()
            ->mapWithKeys(function ($item) {
                return [$item->id => $item->amount];
            });

    }
}
