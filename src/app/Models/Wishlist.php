<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $hash
 * @property int $user_id
 * @property int $product_id
 * @property string $created_at
 * @property string $updated_at
 *
 * @property Product $product
 */
class Wishlist extends Model
{
    /**
     * Database table name
     *
     * @var string
     */
    protected $table = 'wishlist';

    /**
     * Using timestamp
     *
     * @var bool
     */
    public $timestamps = true;

    protected $fillable = ['hash', '$user_id', 'product_id', 'created_at', 'updated_at'];

    public function product()
    {
        return $this->hasOne('App\Models\Product', 'id', 'product_id');
    }
}
