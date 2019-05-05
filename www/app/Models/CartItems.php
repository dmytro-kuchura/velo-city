<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $id
 * @property int $cart_id
 * @property int $product_id
 * @property int $quantity
 * @property float $price
 * @property string $created_at
 * @property string $updated_at
 */
class CartItems extends Model
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
    protected $fillable = ['cart_id', 'product_id', 'quantity', 'price', 'created_at', 'updated_at'];

}
