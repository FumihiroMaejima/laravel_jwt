<?php

use Illuminate\Database\Seeder;

class DepartmentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // データの挿入
        DB::table('departments')->insert([
            'name' => '総務',
            'code' => 'general',
            'created_at' => '2020-06-14 00:00:00',
            'updated_at' => '2020-06-14 00:00:00'
        ]);
        DB::table('departments')->insert([
            'name' => '経理',
            'code' => 'accounting',
            'created_at' => '2020-06-14 00:00:00',
            'updated_at' => '2020-06-14 00:00:00'
        ]);
        DB::table('departments')->insert([
            'name' => '営業',
            'code' => 'sales',
            'created_at' => '2020-06-14 00:00:00',
            'updated_at' => '2020-06-14 00:00:00'
        ]);
        DB::table('departments')->insert([
            'name' => '労務',
            'code' => 'labor',
            'created_at' => '2020-06-14 00:00:00',
            'updated_at' => '2020-06-14 00:00:00'
        ]);
        DB::table('departments')->insert([
            'name' => '広報',
            'code' => 'public_relations',
            'created_at' => '2020-06-14 00:00:00',
            'updated_at' => '2020-06-14 00:00:00'
        ]);
        DB::table('departments')->insert([
            'name' => '人事',
            'code' => 'human_resources',
            'created_at' => '2020-06-14 00:00:00',
            'updated_at' => '2020-06-14 00:00:00'
        ]);
        DB::table('departments')->insert([
            'name' => '監査',
            'code' => 'audit',
            'created_at' => '2020-06-14 00:00:00',
            'updated_at' => '2020-06-14 00:00:00'
        ]);
    }
}
