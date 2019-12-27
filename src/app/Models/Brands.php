<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $alias
 * @property string $name
 * @property string $image
 * @property int $views
 * @property int $status
 * @property string $created_at
 * @property string $updated_at
 */
class Brands extends Model
{
    /**
     * Database table name
     *
     * @var string
     */
    protected $table = 'brands';

    /**
     * Using timestamp
     *
     * @var bool
     */
    public $timestamps = true;

    protected $fillable = [
        'id',
        'name',
        'alias',
        'image',
        'views',
        'status',
        'created_at',
        'updated_at',
    ];
}
