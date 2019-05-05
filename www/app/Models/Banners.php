<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $id
 * @property string $name
 * @property string $alias
 * @property string $image
 * @property string $excerpt
 * @property string $description
 * @property integer $status
 * @property string $created_at
 * @property string $updated_at
 */
class Banners extends Model
{
    /**
     * The "type" of the auto-incrementing ID.
     * 
     * @var string
     */
    protected $keyType = 'integer';

    /**
     * @var array
     */
    protected $fillable = ['name', 'alias', 'image', 'excerpt', 'description', 'status', 'created_at', 'updated_at'];

}
