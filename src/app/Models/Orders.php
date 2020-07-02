<?php

namespace App\Models;

use App\Traits\Date;
use App\Traits\OrderTotal;
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
    use Date, OrderTotal;

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

    protected $fillable = ['user_id', 'delivery', 'payment', 'status', 'created_at', 'updated_at'];

    public function items()
    {
        return $this->hasMany('App\Models\OrderItems', 'order_id');
    }

    public function getRussianDate()
    {
        return $this->getHumanDate($this->created_at);
    }

    public function getOrderTotal()
    {
        return $this->getTotal($this->items);
    }
}
