<?php

namespace App\Models;

use App\Builders\ExpenseSplitBuilder;
use App\Casts\MoneyCast;
use App\Models\Group\Expense;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ExpenseSplit extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'shares',
        'payment_date',
    ];

    public function casts(): array
    {
        return [
            'shares' => MoneyCast::class,
        ];
    }

    public function expense(): BelongsTo
    {
        return $this->belongsTo(Expense::class);
    }

    public function newEloquentBuilder($query): ExpenseSplitBuilder
    {
        return new ExpenseSplitBuilder($query);
    }
}
