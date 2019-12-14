<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $name
 * @property int $status
 * @property string $created_at
 * @property string $updated_at
 */
class Payments extends Model
{
    /**
     * Database table name
     *
     * @var string
     */
    protected $table = 'payments';

    /**
     * Using timestamp
     *
     * @var bool
     */
    public $timestamps = true;

    protected $fillable = ['name', 'status', 'created_at', 'updated_at'];
}
