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
        return Expense::query()->where('group_id', $this->group->id)->with('payer')->orderBy('expense_date', 'desc')->get()->map->getData();
    }

    public function amounts()
    {
        return ExpenseSplit::query()->where('user_id', '=', auth()->user()->id)->get()
            ->mapWithKeys(function ($item) {
                return [$item->expense_id => $item->amount];
            });
    }

    public function amountssss()
    {
        return ExpenseSplit::query()->where('user_id', '=', auth()->user()->id)->sum('amount');
    }
}
