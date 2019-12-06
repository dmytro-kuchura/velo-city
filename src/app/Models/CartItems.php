<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $cart_id
 * @property int $product_id
 * @property int $count
 * @property string $created_at
 * @property string $updated_at
 */
class CartItems extends Model
{
    /**
     * Database table name
     *
     * @var string
     */
    protected $table = 'cart_items';

    /**
     * Using timestamp
     *
     * @var bool
     */
    public $timestamps = true;

    protected $fillable = ['hash', 'cart_id', 'product_id', 'count', 'created_at', 'updated_at'];
}
