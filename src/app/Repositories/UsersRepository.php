<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UsersRepository
{
    protected $model = User::class;

    public function find(int $id): User
    {
        return $this->model::where('id', $id)->first();
    }

    public function changePassword(int $id, array $data)
    {
        return $this->model::where('id', $id)->update([
            'password' => Hash::make($data['new_password']),
        ]);
    }

    public function updateProfile(int $id, array $data)
    {
        return $this->model::where('id', $id)->update([
            'name' => $data['name'],
            'last_name' => $data['last_name'],
            'middle_name' => $data['middle_name'],
            'phone' => $data['phone'],
        ]);
    }
}
