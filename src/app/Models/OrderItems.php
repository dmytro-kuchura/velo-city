<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $order_id
 * @property int $product_id
 * @property int $cost
 * @property int $count
 * @property string $created_at
 * @property string $updated_at
 *
 * @property Product $product
 */
class OrderItems extends Model
{
    /**
     * Database table name
     *
     * @var string
     */
    protected $table = 'order_items';

    /**
     * Using timestamp
     *
     * @var bool
     */
    public $timestamps = true;

    protected $fillable = ['hash', 'order_id', 'product_id', 'count', 'cost', 'created_at', 'updated_at'];

    public function product()
    {
        return $this->hasOne('App\Models\Product', 'id');
    }
}
