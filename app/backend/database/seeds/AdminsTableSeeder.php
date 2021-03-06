<?php

use Illuminate\Database\Seeder;

class AdminsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('admins')->insert([
            'name' => 'admin1',
            'email' => 'testadmin1@example.com',
            'password' => bcrypt(Config::get('local.seeder.password.testadmin')),
            'department_id' => 9,
            'team_id' => 4,
            'role' => 100,
            'created_at' => '2020-06-14 00:00:00',
            'updated_at' => '2020-06-14 00:00:00'
        ]);
        DB::table('admins')->insert([
            'name' => 'subadmin',
            'email' => 'subadmin@example.com',
            'password' => bcrypt(Config::get('local.seeder.password.testadmin')),
            'department_id' => 9,
            'team_id' => 4,
            'role' => 0,
            'created_at' => '2020-06-14 00:00:00',
            'updated_at' => '2020-06-14 00:00:00'
        ]);
        DB::table('admins')->insert([
            'name' => 'busi',
            'email' => 'busi@example.com',
            'password' => bcrypt(Config::get('local.seeder.password.testadmin')),
            'department_id' => 13,
            'team_id' => 11,
            'role' => 50,
            'created_at' => '2020-06-14 00:00:00',
            'updated_at' => '2020-06-14 00:00:00'
        ]);
        DB::table('admins')->insert([
            'name' => 'admin',
            'email' => 'admin@example.com',
            'password' => bcrypt(Config::get('local.seeder.password.testadmin')),
            'department_id' => 13,
            'team_id' => 12,
            'role' => 99,
            'created_at' => '2020-06-14 00:00:00',
            'updated_at' => '2020-06-14 00:00:00'
        ]);
        DB::table('admins')->insert([
            'name' => 'sys',
            'email' => 'sys@example.com',
            'password' => bcrypt(Config::get('local.seeder.password.testadmin')),
            'department_id' => 11,
            'role' => 100,
            'created_at' => '2020-06-14 00:00:00',
            'updated_at' => '2020-06-14 00:00:00'
        ]);
        DB::table('admins')->insert([
            'name' => 'subuser1',
            'email' => 'subuser1@example.com',
            'password' => bcrypt(Config::get('local.seeder.password.testadmin')),
            'department_id' => 1,
            'role' => 0,
            'created_at' => '2020-06-14 00:00:00',
            'updated_at' => '2020-06-14 00:00:00'
        ]);
        DB::table('admins')->insert([
            'name' => 'subuser2',
            'email' => 'subuser2@example.com',
            'password' => bcrypt(Config::get('local.seeder.password.testadmin')),
            'department_id' => 2,
            'role' => 0,
            'created_at' => '2020-06-14 00:00:00',
            'updated_at' => '2020-06-14 00:00:00'
        ]);
        DB::table('admins')->insert([
            'name' => 'subuser3',
            'email' => 'subuser3@example.com',
            'password' => bcrypt(Config::get('local.seeder.password.testadmin')),
            'department_id' => 3,
            'team_id' => 1,
            'role' => 0,
            'created_at' => '2020-06-14 00:00:00',
            'updated_at' => '2020-06-14 00:00:00'
        ]);
    }
}
