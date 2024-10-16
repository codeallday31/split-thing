<?php

namespace App\Http\Controllers;

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
        return Inertia::render('Group/create');
    }
}
