<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $id
 * @property string $name
 * @property string $alias
 * @property string $sku
 * @property string $image
 * @property float $price
 * @property float $old_price
 * @property string $excerpt
 * @property string $description
 * @property integer $status
 * @property string $meta_title
 * @property string $meta_keywords
 * @property string $meta_description
 * @property string $created_at
 * @property string $updated_at
 */
class Products extends Model
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
    protected $fillable = ['name', 'alias', 'sku', 'image', 'price', 'old_price', 'excerpt', 'description', 'status', 'meta_title', 'meta_keywords', 'meta_description', 'created_at', 'updated_at'];

}
