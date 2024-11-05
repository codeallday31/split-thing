<?php

namespace App\Http\Controllers;

use App\Actions\UpsertExpenseAction;
use App\Data\ExpenseData;
use App\Models\Group;
use App\Models\Group\Expense;
use App\ViewModels\UpsertExpenseViewModel;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class ExpenseController
{
    public function index()
    {
        return Inertia::render('Expense/index');
    }

    public function create(Group $group)
    {
        return Inertia::render('Expense/create', [
            'model' => new UpsertExpenseViewModel($group),
        ]);
    }

    public function store(ExpenseData $data, Group $group): RedirectResponse
    {
        UpsertExpenseAction::execute($data);

        return to_route('groups.show', $group->id);
    }

    public function edit(Group $group, Expense $expense)
    {
        return Inertia::render('Expense/create', [
            'model' => new UpsertExpenseViewModel($group, $expense),
        ]);
    }

    public function update(ExpenseData $data, Group $group): RedirectResponse
    {
        UpsertExpenseAction::execute($data);

        return to_route('groups.show', $group->id);
    }

    public function show(Group $group, Expense $expense)
    {
        return Inertia::render('Expense/show');
    }
}
