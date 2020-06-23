<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProfileRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => ['required', 'string'],
            'last_name' => ['required', 'string'],
            'middle_name' => ['string'],
            'phone' => ['string'],
        ];
    }
}
