<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $name
 * @property string $alias
 * @property string $image
 * @property int $parent_id
 * @property int $views
 * @property int $status
 * @property string $title
 * @property string $keywords
 * @property string $description
 * @property string $created_at
 * @property string $updated_at
 *
 * @property bool $addTreeNodeDisabled
 * @property bool $addLeafNodeDisabled
 * @property bool $editNodeDisabled
 *
 * @property Catalog $children
 */
class Catalog extends Model
{
    /**
     * Database table name
     *
     * @var string
     */
    protected $table = 'catalog';

    /**
     * Using timestamp
     *
     * @var bool
     */
    public $timestamps = true;

    protected $fillable = [
        'id',
        'name',
        'alias',
        'image',
        'parent_id',
        'views',
        'status',
        'title',
        'keywords',
        'description',
        'created_at',
        'updated_at',
    ];

    protected $appends = [
        'addTreeNodeDisabled',
        'addLeafNodeDisabled',
    ];

    public function getAddTreeNodeDisabledAttribute()
    {
        return true;
    }

    public function getAddLeafNodeDisabledAttribute()
    {
        return true;
    }

    public function children()
    {
        return $this->hasMany('App\Models\Catalog', 'parent_id', 'id')
            ->orderBy('id', 'asc')
            ->with('children');
    }
}
