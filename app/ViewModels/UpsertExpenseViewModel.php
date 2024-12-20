<?php

namespace App\ViewModels;

use App\Data\ExpenseData;
use App\Data\GroupData;
use App\Enums\ExpenseSplitMethod;
use App\Models\ExpenseSplit;
use App\Models\Group;
use App\Models\Group\Expense;
use Illuminate\Support\Collection;

class UpsertExpenseViewModel extends ViewModel
{
    public function __construct(
        public readonly Group $group,
        public readonly ?Expense $expense = null,
    ) {}

    public function group()
    {
        return GroupData::from($this->group->load('members'))->except('created_at', 'can', 'description', 'name');
    }

    public function splitOptions(): Collection
    {
        return collect(ExpenseSplitMethod::cases())
            ->map(fn ($option) => [
                'label' => $option->name,
                'value' => $option->value,
            ])->values();
    }

    public function expense(): ?ExpenseData
    {
        if (! $this->expense) {
            return null;
        }

        return $this->expense->load('payer')->getData();
    }

    public function participants(): ?Collection
    {
        if (! $this->expense) {
            return null;
        }

        return ExpenseSplit::query()
            ->where('expense_id', $this->expense->id)
            ->where('shares', '>', 0)
            ->get()
            ->mapWithKeys(fn (ExpenseSplit $split) => [
                $split->user_id => $split->shares,
            ]);
    }
}
