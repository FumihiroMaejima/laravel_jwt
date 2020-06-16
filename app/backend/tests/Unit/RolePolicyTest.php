<?php

namespace Tests\Unit;

// use PHPUnit\Framework\TestCase;
use Tests\TestCase;
use Illuminate\Support\Facades\Gate;
use App\Model\User;
// use Illuminate\Support\Facades\DB;

class RolePolicyTest extends TestCase
{
    /**
     * role test data
     * param1.userId
     * param2.role
     * param3.result
     */
    public function roleDataProvider()
    {
        return array(
            'test1' => array(2, 0, false),
        );
    }

    /**
     * A role Test.
     *
     * @dataProvider roleDataProvider
     * @return void
     */
    public function testRoleCheck($id, $role, $result)
    {
        $user = (object) [
            'id' => $id,
            'name' => 'subuser',
            'email' => 'subuser@example.com',
            'email_verified_at' => 'foo',
            'password' => 'password',
            'role' => $role,
            'remember_token' => null,
            'created_at' => '2020-06-14 00:00:00',
            'updated_at' => '2020-06-14 00:00:00'
        ];

        /* 閲覧 */
        if (Gate::allows('role.view', $user)) {
            echo 'view';
            $this->assertTrue($result);
        } else {
            echo 'couldn\'t view';
            $this->assertFalse($result);
        }

    }
}
