<?php

namespace App\ViewModels;

use App\Models\ExpenseSplit;
use App\Models\Group;
use App\Models\Group\Expense;
use Illuminate\Contracts\Database\Query\Builder;

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
            ->with(['payer'])
            ->addSelect([
                'status' => function (Builder $query) {
                    $query->selectRaw("
                    CASE
                        WHEN payer_id = ? THEN 'lent'
                        WHEN EXISTS (
                            SELECT 1
                            FROM expense_splits
                            WHERE expense_splits.expense_id = expenses.id
                            AND expense_splits.user_id = ?
                            AND expense_splits.amount > 0
                        ) THEN 'borrowed'
                        ELSE 'not involved'
                    END", [auth()->id(), auth()->id()]);
                },
            ])
            ->where('group_id', $this->group->id)
            ->orderBy('expense_date', 'asc')
            ->get()
            ->map->getData();
    }

    public function amounts()
    {
        $query = ExpenseSplit::select('expenses.id')
            ->addSelect(['amount' => function (Builder $query) {
                $query->selectRaw('
                    CASE
                        WHEN expenses.payer_id = ? THEN (
                            SELECT SUM(amount)
                            FROM expense_splits as inner_splits
                            WHERE inner_splits.expense_id = expense_splits.expense_id
                            AND inner_splits.user_id != ?
                        )
                        ELSE expense_splits.amount
                    END', [auth()->id(), auth()->id()]);
            },
            ])
            ->join('expenses', 'expense_splits.expense_id', '=', 'expenses.id')
            ->where('expense_splits.user_id', auth()->id());

        return $query->get()
            ->mapWithKeys(function ($item) {
                return [$item->id => $item->amount];
            });

    }
}
