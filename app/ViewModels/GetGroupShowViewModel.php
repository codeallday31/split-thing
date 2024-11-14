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
        return $this->group->load('members')->getData();
    }

    public function expenses()
    {
        return Expense::query()
            ->with(['payer'])
            ->withStatus()
            ->where('group_id', $this->group->id)
            ->orderBy('expense_date', 'asc')
            ->get()
            ->map->getData();
    }

    public function amounts()
    {
        $query = ExpenseSplit::select('expenses.id')
            ->withTotalExpenses()
            ->join('expenses', 'expense_splits.expense_id', '=', 'expenses.id')
            ->where('expense_splits.user_id', auth()->id());

        return $query->get()
            ->mapWithKeys(function ($item) {
                return [$item->id => $item->amount];
            });

    }
}
