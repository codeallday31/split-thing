<?php

namespace App\Data;

use App\Models\User;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Lazy;

class UserData extends Data
{
    public function __construct(
        public readonly int $id,
        public readonly string $name,
        // public readonly null|Lazy $owned_groups
    ) {}

    public static function fromModel(User $user): self
    {
        return self::from([
            ...$user->toArray(),
            // 'owned_groups' => Lazy::whenLoaded(
            //   'groups',
            //   $user,
            //   fn () => GroupData::collect($user->created_groups)
            // )
            // 'groups' => Lazy::when(
            //   fn() => $user->relationLoaded('groups') || $user->relationLoaded('created_groups'),
            //   fn() => GroupData::collect(
            //       collect()->when(
            //           $user->relationLoaded('groups'),
            //           fn($collection) => $collection->merge($user->groups)
            //       )->when(
            //           $user->relationLoaded('created_groups'),
            //           fn($collection) => $collection->merge($user->created_groups)
            //       )
            //   )
            // ),

        ]);
    }
}
