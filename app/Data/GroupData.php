<?php

namespace App\Data;

use App\Models\Group;
use Spatie\LaravelData\Attributes\WithoutValidation;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Lazy;
use Spatie\LaravelData\Optional;

class GroupData extends Data
{
    public function __construct(
        public readonly ?int $id,
        public readonly string $name,
        public readonly ?string $description,
        public readonly array $memberIds,
        #[WithoutValidation]
        public readonly string|Optional $created_at,
        #[WithoutValidation]
        public readonly int|Optional $user_id,
        #[WithoutValidation]
        public readonly ?Lazy $members
    ) {}

    public static function fromModel(Group $group): self
    {
        return self::from([
            ...$group->toArray(),
            'memberIds' => $group->members->pluck('id')->map(fn ($id) => strval($id))->toArray(),
            'created_at' => $group->created_at->format('F d, Y'),
            'members' => Lazy::whenLoaded(
                'members',
                $group,
                fn () => UserData::collect($group->members)
            ),
        ]);
    }
}
