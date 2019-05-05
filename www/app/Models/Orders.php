<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $id
 * @property int $user_id
 * @property int $purchaser_id
 * @property int $shipping_address_id
 * @property string $number
 * @property string $status
 * @property int $self_shipping
 * @property string $notes
 * @property string $created_at
 * @property string $updated_at
 * @property User $user
 * @property Purchaser $purchaser
 * @property Address $address
 * @property OrdersItem[] $ordersItems
 */
class Orders extends Model
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
    protected $fillable = ['user_id', 'purchaser_id', 'shipping_address_id', 'number', 'status', 'self_shipping', 'notes', 'created_at', 'updated_at'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function purchaser()
    {
        return $this->belongsTo('App\Purchaser');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function address()
    {
        return $this->belongsTo('App\Address', 'shipping_address_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function ordersItems()
    {
        return $this->hasMany('App\OrdersItem');
    }
}
