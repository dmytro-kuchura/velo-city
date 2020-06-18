<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $data
 * @property string $created_at
 * @property string $updated_at
 */
class Query extends Model
{
    /**
     * Database table name
     *
     * @var string
     */
    protected $table = 'query';

    /**
     * Using timestamp
     *
     * @var bool
     */
    public $timestamps = true;

    protected $fillable = ['data', 'created_at', 'updated_at'];
}
