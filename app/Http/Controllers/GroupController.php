<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class GroupController
{
    public function index(): Response
    {
        return Inertia::render('Group/Index');
    }

    public function create(): Response
    {
        return Inertia::render('Group/Create');
    }
}
