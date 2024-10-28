<?php

namespace App\Models\Group;

use App\Enums\ExpenseStatus;
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
        'status',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'status' => ExpenseStatus::class,
        ];
    }

    public function splits(): HasMany
    {
        return $this->hasMany(ExpenseSplit::class);
    }
}
