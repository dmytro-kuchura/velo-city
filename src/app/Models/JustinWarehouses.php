<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $number
 * @property string $adress
 * @property string $locality
 * @property string $type
 * @property string $delivery_branch_id
 * @property string $max_weight
 * @property string $description
 * @property string $shedule_description
 * @property int $cardpay
 * @property string $navigation
 * @property string $created_at
 * @property string $updated_at
 */
class JustinWarehouses extends Model
{
    /**
     * Database table name
     *
     * @var string
     */
    protected $table = 'justin_warehouses';

    /**
     * Using timestamp
     *
     * @var bool
     */
    public $timestamps = true;

    protected $fillable = [
        'id',
        'number',
        'adress',
        'locality',
        'type',
        'delivery_branch_id',
        'max_weight',
        'description',
        'shedule_description',
        'cardpay',
        'navigation',
        'created_at',
        'updated_at',
    ];
}
