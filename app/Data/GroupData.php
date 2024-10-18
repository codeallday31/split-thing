<?php

namespace App\Data;

use App\Models\Group;
use App\Models\User;
use Illuminate\Http\Request;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Attributes\WithoutValidation;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;
use Spatie\LaravelData\Lazy;
use Spatie\LaravelData\Optional;

class GroupData extends Data
{
    public function __construct(
        public readonly ?int $id,
        public readonly string $name,
        public readonly ?string $description,
        public readonly array|optional $memberIds,
        #[WithoutValidation]
        #[DataCollectionOf(MemberData::class)]
        public readonly optional|Lazy|DataCollection $members,
        #[WithoutValidation]
        public readonly optional|string $created_at,
    ) {}

    public static function fromRequest(Request $request): self
    {
        return self::from([
            ...$request->all(),
            'members' => MemberData::collect(User::whereIn('id', $request->collect('memberIds'))->get()),
        ]);
    }

    public static function fromModel(Group $group): self
    {
        return self::from([
            ...$group->toArray(),
            'memberIds' => $group->members->pluck('id')->map(fn ($id) => strval($id))->toArray(),
            'created_at' => $group->created_at->format('F d, Y'),
            'members' => Lazy::whenLoaded(
                'members',
                $group,
                fn () => MemberData::collect($group->members)
            ),
        ]);
    }
}
