<?php

use App\Models\Group;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('expenses', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Group::class)->constrained()->cascadeOnDelete();
            $table->string('description');
            $table->integer('amount');
            $table->datetime('expense_date');
            $table->foreignIdFor(User::class, 'payer_id')->constrained('users')->nullOnDelete();
            $table->string('split_method');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expenses');
    }
};
