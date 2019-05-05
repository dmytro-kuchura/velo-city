<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $id
 * @property string $email
 * @property string $token
 * @property integer $status
 * @property string $created_at
 * @property string $updated_at
 */
class Subscribers extends Model
{
    /**
     * The "type" of the auto-incrementing ID.
     * 
     * @var string
     */
    protected $keyType = 'integer';

    /**
     * @var array
     */
    protected $fillable = ['email', 'token', 'status', 'created_at', 'updated_at'];

}
