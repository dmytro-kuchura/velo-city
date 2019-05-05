<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $id
 * @property string $city
 * @property string $address
 * @property int $warehouse_region_id
 * @property int $warehouse_city_id
 * @property int $warehouse_id
 * @property int $status
 * @property string $created_at
 * @property string $updated_at
 * @property Order[] $orders
 */
class Addresses extends Model
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
    protected $fillable = ['city', 'address', 'warehouse_region_id', 'warehouse_city_id', 'warehouse_id', 'status', 'created_at', 'updated_at'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function orders()
    {
        return $this->hasMany('App\Order', 'shipping_address_id');
    }
}
