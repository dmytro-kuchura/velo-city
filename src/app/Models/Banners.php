<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $link
 * @property string $image
 * @property string $slogan
 * @property string $title
 * @property string $description
 * @property int $status
 * @property string $created_at
 * @property string $updated_at
 */
class Banners extends Model
{
    /**
     * Database table name
     *
     * @var string
     */
    protected $table = 'banners';

    /**
     * Using timestamp
     *
     * @var bool
     */
    public $timestamps = true;

    protected $fillable = [
        'id',
        'link',
        'image',
        'slogan',
        'title',
        'description',
        'status',
        'created_at',
        'updated_at',
    ];
}
