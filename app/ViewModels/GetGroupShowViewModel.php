<?php

namespace App\ViewModels;

use App\Models\ExpenseSplit;
use App\Models\Group;
use App\Models\Group\Expense;
use Illuminate\Contracts\Database\Query\Builder;

class GetGroupShowViewModel extends ViewModel
{
    public function __construct(
        public readonly Group $group
    ) {}

    public function group()
    {
        return $this->group->load('members')->getData();
    }

    public function test()
    {

        return collect();
        // $query = Expense::with(['payer'])
        //     ->withSum(['splits' => function (Builder $query) {
        //         $query->where(function (Builder $subQuery) {
        //             $subQuery->where('expenses.payer_id', auth()->id())
        //                 ->whereNot('expense_splits.user_id', auth()->id());
        //         })->orWhere(function (Builder $subQuery) {
        //             $subQuery->whereNot('expenses.payer_id', auth()->id())
        //                 ->where('expense_splits.user_id', auth()->id());
        //         });
        //     }], 'amount')
        //     ->withStatus()
        //     ->where('group_id', $this->group->id)
        //     ->orderBy('expense_date', 'asc');

        // return $query->get()
        //     ->map
        //     ->getData();
    }

    public function balance()
    {
        return collect();

        // return ExpenseSplit::query()
        //     ->selectRaw('
        //         expense_splits.user_id,
        //         SUM(expense_splits.amount) AS total_split_amount,
        //         SUM(CASE WHEN expenses.payer_id = expense_splits.user_id THEN expenses.amount ELSE 0 END) AS total_paid_amount
        //     ')
        //     ->join('expenses', 'expenses.id', '=', 'expense_splits.expense_id')
        //     ->where('expenses.group_id', $this->group->id)
        //     ->groupBy('expense_splits.user_id')
        //     ->get()
        //     ->mapWithKeys(fn ($item) => [$item->user_id => number_format($item->total_paid_amount - $item->total_split_amount, 2)]);
    }

    public function expenses()
    {
        $query = Expense::with(['payer'])
            ->withSum(['splits' => function (Builder $query) {
                $query->where(function (Builder $subQuery) {
                    $subQuery->where('expenses.payer_id', auth()->id())
                        ->whereNot('expense_splits.user_id', auth()->id());
                })->orWhere(function (Builder $subQuery) {
                    $subQuery->whereNot('expenses.payer_id', auth()->id())
                        ->where('expense_splits.user_id', auth()->id());
                });
            }], 'shares')
            ->withCount(['splits'])
            ->withStatus()
            ->where('group_id', $this->group->id);

        return $query->get()
            ->map
            ->getData();
    }
}
