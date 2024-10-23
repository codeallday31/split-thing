<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class ExpenseController
{
    public function create()
    {
        return Inertia::render('Expense/create');
    }
}
