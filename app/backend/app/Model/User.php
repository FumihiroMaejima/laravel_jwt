<?php

namespace App\Model;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Support\Carbon;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;
    protected $carbon;
    protected $now;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function __construct()
    {
        $this->carbon = new Carbon();
        $this->now = $this->carbon->now()->timestamp;
    }

    public function getUserId()
    {
        return  $this->id;
    }

    public function getUserName()
    {
        return $this->name;
    }

    public function getUserEmail()
    {
        return $this->email;
    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.(JWTSubject)
     *
     * @a return mixed
     */
    public function getJWTIdentifier()
    {
        // primary keyを取得
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.(JWTSubject)
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

}
