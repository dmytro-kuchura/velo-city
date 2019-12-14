<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $name
 * @property string $image
 * @property string $alias
 * @property string $content
 * @property string $short
 * @property string $title
 * @property string $keywords
 * @property string $description
 * @property int $status
 * @property int $author
 * @property string $created_at
 * @property string $updated_at
 */
class News extends Model
{
    /**
     * Database table name
     *
     * @var string
     */
    protected $table = 'news';

    /**
     * Using timestamp
     *
     * @var bool
     */
    public $timestamps = true;

    protected $fillable = ['name', 'image', 'alias', 'short', 'title', 'content', 'short', 'title', 'keywords', 'description', 'status', 'author', 'created_at', 'updated_at'];
}
