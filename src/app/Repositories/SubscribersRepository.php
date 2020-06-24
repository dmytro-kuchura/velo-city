<?php

namespace App\Repositories;

use App\Models\Subscribers;
use Illuminate\Support\Str;

class SubscribersRepository
{
    private $model = Subscribers::class;

    public function find(string $email): ?Subscribers
    {
        return $this->model::where('email', $email)->first();
    }

    public function create(array $data): Subscribers
    {
        /** @var Subscribers $subscriber */
        $subscriber = new $this->model;

        $subscriber->email = $data['email'];
        $subscriber->hash = Str::random(50);
        $subscriber->ip = '192.168.1.1';
        $subscriber->status = 1;

        $subscriber->save();

        return $subscriber;
    }
}
