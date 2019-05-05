<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $id
 * @property int $order_id
 * @property int $product_id
 * @property string $name
 * @property int $quantity
 * @property float $price
 * @property string $created_at
 * @property string $updated_at
 * @property Order $order
 */
class OrdersItems extends Model
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
    protected $fillable = ['order_id', 'product_id', 'name', 'quantity', 'price', 'created_at', 'updated_at'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function order()
    {
        return $this->belongsTo('App\Order');
    }
}
