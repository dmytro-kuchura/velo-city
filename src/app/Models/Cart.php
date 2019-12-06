<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $hash
 * @property int $user_id
 * @property string $created_at
 * @property string $updated_at
 */
class Cart extends Model
{
    /**
     * Database table name
     *
     * @var string
     */
    protected $table = 'cart';

    /**
     * Using timestamp
     *
     * @var bool
     */
    public $timestamps = true;

    protected $fillable = ['hash', 'user_id', 'created_at', 'updated_at'];
}
