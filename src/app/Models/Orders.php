<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $user_id
 * @property int $delivery
 * @property int $payment
 * @property int $status
 * @property string $user_lang
 * @property string $phone
 * @property string $first_name
 * @property string $middle_name
 * @property string $last_name
 * @property string $email
 * @property string $comment
 * @property string $ip
 * @property string $created_at
 * @property string $updated_at
 *
 * @property OrderItems $items
 */
class Orders extends Model
{
    /**
     * Database table name
     *
     * @var string
     */
    protected $table = 'orders';

    /**
     * Using timestamp
     *
     * @var bool
     */
    public $timestamps = true;

    protected $fillable = ['$user_id', '$delivery', '$payment', '$status', 'created_at', 'updated_at'];

    public function items()
    {
        return $this->hasMany('App\Models\OrderItems', 'order_id');
    }
}
