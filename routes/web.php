<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [AuthenticatedSessionController::class, 'create']);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::resource('groups', GroupController::class);
    Route::prefix('groups')->name('expenses.')->group(function () {
        Route::get('{group}/expenses/create', [ExpenseController::class, 'create'])->name('create');
        Route::post('{group}/expenses', [ExpenseController::class, 'store'])->name('store');
        Route::get('{group}/expenses/{expense}/edit', [ExpenseController::class, 'edit'])->name('edit');
    });

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
