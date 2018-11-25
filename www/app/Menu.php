<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $menu_id
 * @property string $title
 * @property string $url
 * @property string $target
 * @property string $icon_class
 * @property string $color
 * @property int $parent_id
 * @property int $order
 * @property string $created_at
 * @property string $updated_at
 * @property string $route
 * @property string $parameters
 * @property Menu $menu
 */
class Menu extends Model
{
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'menu_items';

    /**
     * @var array
     */
    protected $fillable = ['menu_id', 'title', 'url', 'target', 'icon_class', 'color', 'parent_id', 'order', 'created_at', 'updated_at', 'route', 'parameters'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function menu()
    {
        return $this->belongsTo('App\Menu');
    }
}
