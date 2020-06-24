<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Forms\ContactsFormRequest;
use App\Repositories\ContactsFormRepository;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

class ContactsController
{
    private $repository;

    public function __construct(ContactsFormRepository $contactsFormRepository)
    {
        $this->repository = $contactsFormRepository;
    }

    public function contacts(ContactsFormRequest $request)
    {
        $check = $this->repository->find($request->get('email'));

        if ($check && $check->ip === '192.168.1.1' && Carbon::now()->diffInMinutes($check->created_at) < 5) {
            return $this->returnResponse([
                'success' => false,
            ], 400);
        }

        try {
            $this->repository->create($request->all());
        } catch (\Throwable $exception) {
            Log::error($exception->getMessage());

            return $this->returnResponse([
                'success' => false,
            ], 400);
        }

        return $this->returnResponse([
            'success' => true,
        ]);
    }
}
