<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $name
 * @property string $alias
 * @property string $content
 * @property string $h1
 * @property string $title
 * @property string $keywords
 * @property string $description
 * @property int $status
 * @property int $sort
 * @property int $views
 * @property int $parent_id
 * @property string $created_at
 * @property string $updated_at
 */
class Pages extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'pages';
    /**
     * @var array
     */
    protected $fillable = ['name', 'alias', 'content', 'h1', 'title', 'keywords', 'description', 'status', 'sort', 'views', 'parent_id', 'parent_id', 'created_at', 'updated_at'];
}