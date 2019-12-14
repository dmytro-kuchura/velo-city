<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $region_id
 * @property string $name_ru
 * @property string $name_ua
 * @property string $created_at
 * @property string $updated_at
 */
class Cities extends Model
{
    /**
     * Database table name
     *
     * @var string
     */
    protected $table = 'ukraine_cities';

    /**
     * Using timestamp
     *
     * @var bool
     */
    public $timestamps = true;

    protected $fillable = ['region_id', 'name_ru', 'name_ua', 'created_at', 'updated_at'];
}
