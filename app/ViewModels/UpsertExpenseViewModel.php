<?php

namespace App\ViewModels;

use App\Data\ExpenseData;
use App\Enums\ExpenseSplitMethod;
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
        return $this->group->getData();
    }

    /**
     * @return Collection<int, array<string, string>>
     */
    public function splitOptions(): Collection
    {
        return collect(ExpenseSplitMethod::cases())
            ->map(fn ($option) => [
                'label' => $option->name,
                'value' => $option->value,
            ]);
    }

    public function expense(): ?ExpenseData
    {
        if (! $this->expense) {
            return null;
        }

        return $this->expense->load('payer')->getData();
    }
}
