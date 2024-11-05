<?php

namespace App\Models;

use App\Models\Group\Expense;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ExpenseSplit extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'amount',
        'payment_date',
    ];

    public function expense(): BelongsTo
    {
        return $this->belongsTo(Expense::class);
    }
}
