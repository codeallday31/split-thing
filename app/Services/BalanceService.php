<?php

namespace App\Services;

use App\Enums\ExpenseSplitMethod;
use Illuminate\Database\Eloquent\Collection;

class BalanceService
{
    public function __construct(
        public readonly Collection $splits
    ) {}

    public function tempBalance()
    {

        return $this->splits->groupBy('user_id')
            ->map(function ($items) {
                $totalExpenseAmount = 0;
                $paid = 0;

                $items->each(function ($item) use (&$totalExpenseAmount, &$paid) {
                    [$myShare, $totalShares] = $item['split_method'] === ExpenseSplitMethod::Equally->value
                        ? [1, $item['splits_count']]
                        : [$item['shares'], $item['amount']];

                    if ($item['payer_id'] === $item['user_id']) {
                        $totalExpenseAmount += $item['amount'];
                    }

                    $paid += ($item['amount'] * $myShare) / $totalShares;

                });

                return [
                    'total_expenses' => $totalExpenseAmount,
                    'paid' => $paid,
                    'balance' => $totalExpenseAmount - $paid,
                ];
            });
    }

    public function repayments($balances)
    {
        $creditors = collect($balances)->filter(fn ($user) => $user['balance'] > 0)->toArray();
        $debtors = collect($balances)->filter(fn ($user) => $user['balance'] < 0)->toArray();

        $transactions = [];

        while (! empty($creditors) && ! empty($debtors)) {
            $creditorId = array_key_first($creditors);
            $debtorId = array_key_first($debtors);

            $creditAmount = $creditors[$creditorId]['balance'];
            $debtAmount = abs($debtors[$debtorId]['balance']);

            $settleAmount = min($creditAmount, $debtAmount);
            $transactions[] = [
                'from' => $debtorId,
                'to' => $creditorId,
                'amount' => $settleAmount,
            ];

            $creditors[$creditorId]['balance'] -= $settleAmount;
            $debtors[$debtorId]['balance'] += $settleAmount;

            if ($creditors[$creditorId]['balance'] == 0) {
                unset($creditors[$creditorId]);
            }
            if ($debtors[$debtorId]['balance'] == 0) {
                unset($debtors[$debtorId]);
            }
        }

        return $transactions;
    }

    public function getBalance(array $suggestedReimbursements)
    {
        $balances = [];
        foreach ($suggestedReimbursements as $reimbursement) {
            $from = $reimbursement['from'];
            $to = $reimbursement['to'];
            $amount = $reimbursement['amount'];

            // Ensure 'from' participant exists in balances
            if (! array_key_exists($from, $balances)) {
                $balances[$from] = ['total_expenses' => 0, 'paid' => 0, 'balance' => 0];
            }

            // Ensure 'to' participant exists in balances
            if (! array_key_exists($to, $balances)) {
                $balances[$to] = ['total_expenses' => 0, 'paid' => 0, 'balance' => 0];
            }

            // Update balances for the 'from' participant
            $balances[$from]['paid'] += $amount;
            $balances[$from]['balance'] -= $amount;

            // Update balances for the 'to' participant
            $balances[$to]['total_expenses'] += $amount;
            $balances[$to]['balance'] += $amount;
        }

        return $balances;
    }
}
