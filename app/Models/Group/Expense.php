<?php

namespace App\Models\Group;

use App\Builders\ExpenseBuilder;
use App\Casts\MoneyCast;
use App\Data\ExpenseData;
use App\Enums\ExpenseSplitMethod;
use App\Enums\ExpenseStatus;
use App\Models\ExpenseSplit;
use App\Models\Group;
use App\Models\User;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\LaravelData\WithData;

class Expense extends Model
{
    use HasFactory;
    use WithData;

    protected $fillable = [
        'group_id',
        'description',
        'amount',
        'expense_date',
        'payer_id',
        'split_method',
    ];

    protected $dataClass = ExpenseData::class;

    //
    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'split_method' => ExpenseSplitMethod::class,
            'status' => ExpenseStatus::class,
            'amount' => MoneyCast::class,
            'expense_date' => 'datetime',
        ];
    }

    public function splits(): HasMany
    {
        return $this->hasMany(ExpenseSplit::class);
    }

    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class);
    }

    public function payer(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function newEloquentBuilder($query): ExpenseBuilder
    {
        return new ExpenseBuilder($query);
    }

    protected function balance(): Attribute
    {
        [$myShare, $totalShares] = $this->split_method === ExpenseSplitMethod::Equally
             ? [$this->splits_sum_shares / 100, $this->splits_count]
             : [$this->splits_sum_shares, $this->amount];

        return new Attribute(
            get: fn () => $this->splits_sum_shares
                ? $this->amount * $myShare / $totalShares
                : 0
        );
    }
}
