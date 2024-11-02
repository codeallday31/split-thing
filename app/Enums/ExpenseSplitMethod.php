<?php

namespace App\Enums;

use App\Actions\SplitMethodActions\AmountBasedAction;
use App\Actions\SplitMethodActions\EqualAction;
use App\Actions\SplitMethodActions\PercentageBasedAction;
use App\Actions\SplitMethodActions\ShareBasedAction;
use App\Data\ExpenseParticipantData;
use Illuminate\Support\Collection;

enum ExpenseSplitMethod: string
{
    case Equally = 'equally';
    case Amount = 'amount';
    case Percentage = 'percentage';
    case Share = 'share';

    public function createExpenseSplit()
    {
        return match ($this) {
            self::Equally => app(EqualAction::class),
            self::Amount => app(AmountBasedAction::class),
            self::Percentage => app(PercentageBasedAction::class),
            self::Share => app(ShareBasedAction::class)
        };
    }

    public function filterParticipants(array $participants): Collection
    {
        $participants = ExpenseParticipantData::collect($participants, Collection::class);

        return match ($this) {
            self::Equally => $participants->filter(fn (ExpenseParticipantData $participant) => $participant->is_selected),
            self::Amount => $participants->filter(fn (ExpenseParticipantData $participant) => $participant->is_selected && $participant->value >= floatval(1)),
            self::Percentage => $participants->filter(fn (ExpenseParticipantData $participant) => $participant->is_selected && $participant->value >= floatval(1)),
            self::Share => $participants->filter(fn (ExpenseParticipantData $participant) => $participant->is_selected && $participant->value >= floatval(1)),
        };
    }
}
