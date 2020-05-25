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
            'email' => 'test_tarou@example.com',
            'password' => bcrypt('testpassword'),
        ]);
    }
}
