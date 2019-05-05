<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $id
 * @property int $user_id
 * @property string $fingerprint
 * @property string $created_at
 * @property string $updated_at
 */
class Cart extends Model
{
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'cart';

    /**
     * The "type" of the auto-incrementing ID.
     * 
     * @var string
     */
    protected $keyType = 'integer';

    /**
     * @var array
     */
    protected $fillable = ['user_id', 'fingerprint', 'created_at', 'updated_at'];

}
