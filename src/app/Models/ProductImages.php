<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $link
 * @property int $product_id
 * @property int $status
 * @property string $created_at
 * @property string $updated_at
 */
class ProductImages extends Model
{
    /**
     * Database table name
     *
     * @var string
     */
    protected $table = 'product_images';

    /**
     * Using timestamp
     *
     * @var bool
     */
    public $timestamps = true;

    protected $fillable = ['link', 'product_id', 'status', 'created_at', 'updated_at'];
}
