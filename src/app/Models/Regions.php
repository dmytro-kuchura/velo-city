<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $name_ru
 * @property string $name_ua
 * @property string $created_at
 * @property string $updated_at
 */
class Regions extends Model
{
    /**
     * Database table name
     *
     * @var string
     */
    protected $table = 'ukraine_regions';

    /**
     * Using timestamp
     *
     * @var bool
     */
    public $timestamps = true;

    protected $fillable = ['name_ru', 'name_ua', 'created_at', 'updated_at'];
}
