<?php

namespace App\ViewModels;

use App\Models\ExpenseSplit;
use App\Models\Group;
use App\Models\Group\Expense;
use App\Services\BalanceService;
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

    public function balances()
    {
        $splits = ExpenseSplit::query()
            ->select([
                'group_id',
                'shares',
                'amount',
                'split_method',
                'user_id',
                'payer_id',
                'expense_id',
            ])
            ->selectRaw('(SELECT COUNT(*) FROM expense_splits WHERE expenses.id = expense_splits.expense_id) AS splits_count')
            ->join('expenses', 'expenses.id', '=', 'expense_splits.expense_id')
            ->where('expenses.group_id', $this->group->id)
            ->get();

        $balanceService = new BalanceService($splits);
        $tempBalances = $balanceService->tempBalance();
        $repayments = $balanceService->repayments($tempBalances);
        $balances = $balanceService->getBalance($repayments);

        return [
            'data' => $balances,
            'repayments' => $repayments,
        ];
    }
}
