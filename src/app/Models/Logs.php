<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $name
 * @property string $link
 * @property int $deleted
 * @property string $type
 * @property int $status
 * @property string $created_at
 * @property string $updated_at
 */
class Logs extends Model
{
    /**
     * Database table name
     *
     * @var string
     */
    protected $table = 'logs';

    /**
     * Using timestamp
     *
     * @var bool
     */
    public $timestamps = true;

    protected $fillable = ['name', 'link', 'deleted', 'type', 'status', 'created_at', 'updated_at'];
}
