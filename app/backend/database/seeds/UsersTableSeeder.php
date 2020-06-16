<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'testuser',
            'email' => 'testuser@example.com',
            'password' => bcrypt('testpassword'),
            'role' => 100,
            'created_at' => '2020-06-14 00:00:00',
            'updated_at' => '2020-06-14 00:00:00'
        ]);
        DB::table('users')->insert([
            'name' => 'subuser',
            'email' => 'subuser@example.com',
            'password' => bcrypt('subuserpassword'),
            'role' => 0,
            'created_at' => '2020-06-14 00:00:00',
            'updated_at' => '2020-06-14 00:00:00'
        ]);
        DB::table('users')->insert([
            'name' => 'business',
            'email' => 'business@example.com',
            'password' => bcrypt('businesspassword'),
            'role' => 50,
            'created_at' => '2020-06-14 00:00:00',
            'updated_at' => '2020-06-14 00:00:00'
        ]);
        DB::table('users')->insert([
            'name' => 'administrator',
            'email' => 'administrator@example.com',
            'password' => bcrypt('adminpassword'),
            'role' => 99,
            'created_at' => '2020-06-14 00:00:00',
            'updated_at' => '2020-06-14 00:00:00'
        ]);
        DB::table('users')->insert([
            'name' => 'system',
            'email' => 'system@example.com',
            'password' => bcrypt('systempassword'),
            'role' => 100,
            'created_at' => '2020-06-14 00:00:00',
            'updated_at' => '2020-06-14 00:00:00'
        ]);
    }
}
