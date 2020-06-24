<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $email
 * @property string $name
 * @property string $message
 * @property string $ip
 * @property int $status
 * @property string $created_at
 * @property string $updated_at
 */
class ContactsForm extends Model
{
    /**
     * Database table name
     *
     * @var string
     */
    protected $table = 'contacts_form';

    /**
     * Using timestamp
     *
     * @var bool
     */
    public $timestamps = true;

    protected $fillable = [
        'id',
        'email',
        'name',
        'message',
        'ip',
        'status',
        'created_at',
        'updated_at',
    ];
}
