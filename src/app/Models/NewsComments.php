<?php

namespace App\Models;

use App\Traits\Date;
use App\Traits\OriginalImage;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $name
 * @property string $email
 * @property string $message
 * @property int $news_id
 * @property int $reply_id
 * @property int $status
 * @property NewsComments $replies
 * @property string $created_at
 * @property string $updated_at
 */
class NewsComments extends Model
{
    use Date, OriginalImage;

    /**
     * Database table name
     *
     * @var string
     */
    protected $table = 'news_comments';

    /**
     * Using timestamp
     *
     * @var bool
     */
    public $timestamps = true;

    protected $fillable = ['name', 'email', 'message', 'news_id', 'reply_id', 'status', 'created_at', 'updated_at'];

    public function getRussianDate()
    {
        return $this->getHumanDate($this->created_at);
    }

    public function replies()
    {
        return $this->hasMany('App\Models\NewsComments', 'reply_id', 'id');
    }
}
