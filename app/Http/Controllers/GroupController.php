<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\ViewModels\UpsertGroupViewModel;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class GroupController
{
    public function index(): Response
    {

        return Inertia::render('Group/index');
    }

    public function create(): Response
    {
        return Inertia::render('Group/create', [
            'model' => new UpsertGroupViewModel()
        ]);
    }

    public function store(): RedirectResponse
    {
        return to_route('groups.index');
    }
}
