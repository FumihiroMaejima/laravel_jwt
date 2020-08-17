<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDevelopmentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // 所属部署テーブル
        Schema::create('departments', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('所属部署');
            $table->string('code')->unique()->comment('部署コード');
            $table->timestamps();
            $table->softDeletes();
        });

        // 所属チームテーブル
        Schema::create('teams', function (Blueprint $table) {
            $table->id();
            $table->foreignId('department_id')->comment('所属部署ID')->constrained()->onDelete('cascade');
            // $table->foreignId('user_id')->constrained('users'); // テーブル名を指定する場合
            $table->string('name')->comment('所属チーム');
            $table->string('code')->unique()->comment('チームコード');
            $table->timestamps();
            $table->softDeletes();
        });

        // 管理者ログテーブル
        Schema::create('admin_log', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->comment('管理者ID')->constrained();
            $table->string('path')->comment('リクエストURL');
            $table->string('method')->comment('リクエストメソッド');
            $table->tinyInteger('status')->comment('ステータスコード');
            $table->timestamp('start_at', 0)->comment('アクション開始時刻');
            $table->timestamp('end_at', 0)->comment('アクション終了時刻');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('department');
        Schema::dropIfExists('teams');
    }
}
