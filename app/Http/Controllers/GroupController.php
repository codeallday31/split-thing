<?php

namespace App\Http\Controllers;

use App\Actions\UpsertGroupAction;
use App\Data\GroupData;
use App\Models\Group;
use App\ViewModels\GetGroupShowViewModel;
use App\ViewModels\UpsertGroupViewModel;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class GroupController
{
    public function index(): Response
    {
        return Inertia::render('Group/index', [
            'all_groups' => fn () => Group::query()->where(function ($query) {
                return $query->whereUserId(auth()->user()->id)
                    ->orWhereHas('members', function ($q) {
                        return $q->where('user_id', auth()->user()->id);
                    });
            })->get()->map->getdata(),
            'created_groups' => Inertia::lazy(fn () => Group::query()->whereUserId(auth()->user()->id)->get()->map->getData()),
            'joined_groups' => Inertia::lazy(fn () => Group::whereHas('members', function ($query) {
                $query->where('user_id', auth()->user()->id);
            })->get()->map->getData()),
            'has_groups' => true,
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

    public function show(Group $group, Request $request): Response
    {
        return Inertia::render('Group/show', [
            'model' => new GetGroupShowViewModel($group),
        ]);
    }

    /**
     * Update the given blog post.
     *
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function edit(Group $group)
    {
        Gate::authorize('modify', $group);

        return Inertia::render('Group/create', [
            'model' => new UpsertGroupViewModel($group),
        ]);
    }

    public function update(GroupData $data, Request $request): RedirectResponse
    {
        UpsertGroupAction::execute($data, $request->user());

        return to_route('groups.index');
    }
}
