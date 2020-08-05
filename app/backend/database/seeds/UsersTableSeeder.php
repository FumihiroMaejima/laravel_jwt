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
            'name' => 'testadmin',
            'email' => 'testadmin@example.com',
            'password' => bcrypt(Config::get('local.seeder.password.testuser')),
            'role' => 100,
            'created_at' => '2020-06-14 00:00:00',
            'updated_at' => '2020-06-14 00:00:00'
        ]);
        DB::table('users')->insert([
            'name' => 'subadmin',
            'email' => 'subadmin@example.com',
            'password' => bcrypt(Config::get('local.seeder.password.testuser')),
            'role' => 0,
            'created_at' => '2020-06-14 00:00:00',
            'updated_at' => '2020-06-14 00:00:00'
        ]);
        DB::table('users')->insert([
            'name' => 'busi',
            'email' => 'busi@example.com',
            'password' => bcrypt(Config::get('local.seeder.password.testuser')),
            'role' => 50,
            'created_at' => '2020-06-14 00:00:00',
            'updated_at' => '2020-06-14 00:00:00'
        ]);
        DB::table('users')->insert([
            'name' => 'admin',
            'email' => 'admin@example.com',
            'password' => bcrypt(Config::get('local.seeder.password.testuser')),
            'role' => 99,
            'created_at' => '2020-06-14 00:00:00',
            'updated_at' => '2020-06-14 00:00:00'
        ]);
        DB::table('users')->insert([
            'name' => 'sys',
            'email' => 'sys@example.com',
            'password' => bcrypt(Config::get('local.seeder.password.testuser')),
            'role' => 100,
            'created_at' => '2020-06-14 00:00:00',
            'updated_at' => '2020-06-14 00:00:00'
        ]);
    }
}
