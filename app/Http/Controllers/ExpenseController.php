<?php

namespace App\Http\Controllers;

use App\Actions\CreateExpenseAction;
use App\Data\ExpenseData;
use App\Models\Group;
use App\Models\Group\Expense;
use App\ViewModels\UpsertExpenseViewModel;
use Gate;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExpenseController
{
    public function create(Group $group)
    {
        Gate::authorize('create', [Expense::class, $group]);

        return Inertia::render('Expense/create', [
            'model' => new UpsertExpenseViewModel($group),
        ]);
    }

    public function store(ExpenseData $data)
    {
        CreateExpenseAction::execute($data);
    }
}
