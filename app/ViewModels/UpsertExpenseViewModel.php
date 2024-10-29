<?php

namespace App\ViewModels;

use App\Enums\ExpenseSplitMethods;
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
        return $this->group->load('members')->getData();
    }

    /**
     * @return Collection<int, ExpenseSplitMethods>
     */
    public function splitOptions(): Collection
    {
        return collect(ExpenseSplitMethods::cases())
            ->map(fn ($option) => [
                'name' => $option->name,
                'value' => $option->value
            ]);
    }
}
