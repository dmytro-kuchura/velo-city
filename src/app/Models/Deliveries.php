<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $name
 * @property float $commissions
 * @property int $max_weight
 * @property int $status
 * @property string $created_at
 * @property string $updated_at
 */
class Deliveries extends Model
{
    /**
     * Database table name
     *
     * @var string
     */
    protected $table = 'deliveries';

    /**
     * Using timestamp
     *
     * @var bool
     */
    public $timestamps = true;

    protected $fillable = ['name', 'commissions', 'max_weight', 'status', 'created_at', 'updated_at'];
}
