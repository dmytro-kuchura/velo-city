<?php

namespace App\Repositories;

use App\Models\ContactsForm;

class ContactsFormRepository
{
    private $model = ContactsForm::class;

    public function find(string $email): ?ContactsForm
    {
        return $this->model::where('email', $email)->first();
    }

    public function create(array $data): ContactsForm
    {
        /** @var ContactsForm $contacts */
        $contacts = new $this->model;

        $contacts->name = $data['name'];
        $contacts->message = $data['message'];
        $contacts->email = $data['email'];
        $contacts->ip = '192.168.1.1';
        $contacts->status = 1;

        $contacts->save();

        return $contacts;
    }
}
