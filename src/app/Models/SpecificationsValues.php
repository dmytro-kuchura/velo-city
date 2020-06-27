<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $name
 * @property string $alias
 * @property int $status
 * @property int $sort
 * @property int $specification_id
 * @property string $color
 * @property string $created_at
 * @property string $updated_at
 */
class SpecificationsValues extends Model
{
    /**
     * Database table name
     *
     * @var string
     */
    protected $table = 'specifications_values';

    /**
     * Using timestamp
     *
     * @var bool
     */
    public $timestamps = true;

    protected $fillable = ['name', 'alias', 'status', 'sort', 'color', 'specification_id', 'created_at', 'updated_at'];
}
