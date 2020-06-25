<?php

namespace App;

use App\Models\Enum\UserConstants;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

/**
 * @property int $id
 * @property string $name
 * @property string $email
 * @property string $password
 * @property string $last_name
 * @property string $middle_name
 * @property string $phone
 * @property string $remember_token
 * @property int $role
 * @property int $status
 * @property string $user_lang
 * @property string email_verified_at
 * @property string $created_at
 * @property string $updated_at
 */
class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'last_name', 'middle_name', 'phone', 'remember_token', 'role', 'status', 'user_lang',
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

    public function isAdmin(): bool
    {
        return $this->role && $this->role == UserConstants::IS_ADMIN;
    }

    public function isActive(): bool
    {
        return $this->status && $this->status == UserConstants::IS_ACTIVE;
    }
}
