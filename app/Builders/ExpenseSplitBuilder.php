<?php

namespace App\Builders;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Contracts\Database\Query\Builder as QueryBuilder;

class ExpenseSplitBuilder extends Builder
{
    public function withTotalExpenses()
    {
        return $this->addSelect(['amount' => function (QueryBuilder $query) {
            $query->selectRaw('
                CASE
                    WHEN expenses.payer_id = ? THEN (
                        SELECT SUM(amount)
                        FROM expense_splits as inner_splits
                        WHERE inner_splits.expense_id = expense_splits.expense_id
                        AND inner_splits.user_id != ?
                    )
                    ELSE expense_splits.amount
                END', [auth()->id(), auth()->id()]);
            },
        ]);
    }
}
