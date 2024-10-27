<?php

namespace App\Models\Group;

use App\Models\ExpenseSplit;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Expense extends Model
{
    use HasFactory;

    protected $fillable = [
        'group_id',
        'description',
        'amount',
        'expense_date',
    ];

    public function splits(): HasMany
    {
        return $this->hasMany(ExpenseSplit::class);
    }
}
