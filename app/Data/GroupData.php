<?php

namespace App\Data;

use App\Models\Group;
use App\Models\User;
use App\Policies\GroupPolicy;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Spatie\LaravelData\Attributes\MapInputName;
use Spatie\LaravelData\Attributes\WithCast;
use Spatie\LaravelData\Casts\DateTimeInterfaceCast;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Lazy;

class GroupData extends Data
{
    /**
     * @param  array<int, string>|Collection<int, MemberData>|Lazy  $members
     */
    public function __construct(
        public readonly ?int $id,
        public readonly string $name,
        public readonly ?string $description,
        #[WithCast(DateTimeInterfaceCast::class, format: 'Y-m-d H:i:s')]
        public readonly ?Carbon $created_at,
        #[MapInputName('memberIds')]
        public readonly array|Collection|Lazy $members,
        public readonly ?array $can
    ) {}

    public static function fromRequest(Request $request): self
    {
        return self::from([
            ...$request->all(),
            'memberIds' => MemberData::collect(User::whereIn('id', $request->collect('memberIds'))->get()),
        ]);
    }

    public static function fromModel(Group $group): self
    {

        return self::from([
            ...$group->toArray(),
            'created_at' => $group->created_at->format('Y-m-d H:i:s'),
            'members' => Lazy::whenLoaded(
                'members',
                $group,
                fn () => UserData::collect($group->members->where('id', '!=', auth()->user()->id))
            ),
            'can' => [
                'modify' => Auth::user()->can(GroupPolicy::MODIFY, $group),
            ],
        ]);
    }
}
