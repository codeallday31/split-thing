<?php

namespace App\Builders;

use Illuminate\Contracts\Database\Query\Builder as QueryBuilder;
use Illuminate\Database\Eloquent\Builder;

class ExpenseBuilder extends Builder
{
    public function withStatus(): self
    {
        return $this->addSelect([
            'status' => function (QueryBuilder $query) {
                $query->selectRaw("
                CASE
                    WHEN payer_id = ? THEN 'lent'
                    WHEN EXISTS (
                        SELECT 1
                        FROM expense_splits
                        WHERE expense_splits.expense_id = expenses.id
                        AND expense_splits.user_id = ?
                        AND expense_splits.shares > 0
                    ) THEN 'borrowed'
                    ELSE 'not involved'
                END", [auth()->id(), auth()->id()]);
            },
        ]);
    }
}
