<?php

namespace App\Models;

use App\Data\GroupData;
use App\Models\Group\Expense;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\LaravelData\WithData;

class Group extends Model
{
    use HasFactory;
    use WithData;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'description',
        'type',
        'user_id',
    ];

    // protected $with = ['members:id,name'];

    protected $dataClass = GroupData::class;

    public function members(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'group_member')
            ->withPivot(['joined_at']);
    }

    public function expenses(): HasMany
    {
        return $this->hasMany(Expense::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
