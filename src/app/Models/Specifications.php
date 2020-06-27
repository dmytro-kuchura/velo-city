<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $name
 * @property string $alias
 * @property int $type
 * @property int $status
 * @property int $sort
 * @property string $created_at
 * @property string $updated_at
 *
 * @property SpecificationsValues $values
 */
class Specifications extends Model
{
    /**
     * Database table name
     *
     * @var string
     */
    protected $table = 'specifications';

    /**
     * Using timestamp
     *
     * @var bool
     */
    public $timestamps = true;

    protected $fillable = ['name', 'alias', 'type', 'status', 'sort', 'created_at', 'updated_at'];

    public function values()
    {
        return $this->hasMany('App\Models\SpecificationsValues', 'specification_id');
    }
}
