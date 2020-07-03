<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Swagger\Annotations as SWG;

/**
 * @SWG\Definition(
 *  definition="Subscribers",
 *  @SWG\Property(
 *      property="id",
 *      type="integer"
 *  ),
 *  @SWG\Property(
 *      property="email",
 *      type="string"
 *  ),
 *  @SWG\Property(
 *      property="ip",
 *      type="string"
 *  ),
 *  @SWG\Property(
 *      property="hash",
 *      type="string"
 *  ),
 *  @SWG\Property(
 *      property="status",
 *      type="integer"
 *  )
 * )
 */

/**
 * @property int $id
 * @property string $email
 * @property string $ip
 * @property string $hash
 * @property int $status
 * @property string $created_at
 * @property string $updated_at
 */
class Subscribers extends Model
{
    /**
     * Database table name
     *
     * @var string
     */
    protected $table = 'subscribers';

    /**
     * Using timestamp
     *
     * @var bool
     */
    public $timestamps = true;

    protected $fillable = [
        'id',
        'email',
        'ip',
        'hash',
        'status',
        'created_at',
        'updated_at',
    ];
}
