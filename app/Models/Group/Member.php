<?php

namespace App\Models\Group;

use App\Models\Group;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\Pivot;

class Member extends Pivot
{
    use HasFactory;

    public function group(): BelongsToMany
    {
        return $this->belongsToMany(Group::class);
    }
}
