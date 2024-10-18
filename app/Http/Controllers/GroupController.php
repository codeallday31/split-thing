<?php

namespace App\Http\Controllers;

use App\Actions\UpsertGroupAction;
use App\Data\GroupData;
use App\Models\Group;
use App\ViewModels\GetGroupsViewModel;
use App\ViewModels\UpsertGroupViewModel;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GroupController
{
    public function index(): Response
    {
        return Inertia::render('Group/index', [
            'model' => new GetGroupsViewModel()
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Group/create', [
            'model' => new UpsertGroupViewModel,
        ]);
    }

    public function store(GroupData $data, Request $request): RedirectResponse
    {
        UpsertGroupAction::execute($data, $request->user());

        return to_route('groups.index');
    }
}
