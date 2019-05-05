<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $id
 * @property string $name
 * @property string $alias
 * @property string $image
 * @property integer $status
 * @property int $parent_id
 * @property string $meta_title
 * @property string $meta_keywords
 * @property string $meta_description
 * @property string $created_at
 * @property string $updated_at
 */
class Catalog extends Model
{
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'catalog';

    /**
     * The "type" of the auto-incrementing ID.
     * 
     * @var string
     */
    protected $keyType = 'integer';

    /**
     * @var array
     */
    protected $fillable = ['name', 'alias', 'image', 'status', 'parent_id', 'meta_title', 'meta_keywords', 'meta_description', 'created_at', 'updated_at'];

}
