<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $name
 * @property string $alias
 * @property int $category_id
 * @property int $status
 * @property int $new
 * @property int $sale
 * @property int $top
 * @property int $available
 * @property int $cost
 * @property int $cost_old
 * @property int $views
 * @property int $brand
 * @property string $article
 * @property string $image
 * @property string $specifications
 * @property string $information
 * @property string $title
 * @property string $keywords
 * @property string $description
 * @property string $created_at
 * @property string $updated_at
 */
class Product extends Model
{
    protected $fillable = ['name', 'alias', 'category_id', 'status', 'new', 'sale', 'top', 'available', 'cost', 'cost_old', 'views', 'brand', 'article', 'image', 'specifications', 'information', 'title', 'keywords', 'description', 'created_at', 'updated_at'];
}
