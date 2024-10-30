<?php

namespace App\Http\Controllers;

use App\Actions\CreateExpenseAction;
use App\Data\ExpenseData;
use App\Models\Group;
use App\ViewModels\UpsertExpenseViewModel;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class ExpenseController
{
    public function create(Group $group)
    {
        return Inertia::render('Expense/create', [
            'model' => new UpsertExpenseViewModel($group),
        ]);
    }

    public function store(ExpenseData $data): RedirectResponse
    {
        $expense = CreateExpenseAction::execute($data);

        return to_route('groups.show', $expense->group->id);
    }
}
