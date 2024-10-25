<?php

namespace App\Http\Controllers;

use App\Data\ExpenseData;
use App\Models\Group;
use App\ViewModels\UpsertExpenseViewModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExpenseController
{
    public function create(Group $group)
    {
        return Inertia::render('Expense/create', [
            'model' => new UpsertExpenseViewModel($group),
        ]);
    }

    public function store(ExpenseData $data, Request $request)
    {
        dd($data);
    }
}
