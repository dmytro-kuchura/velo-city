<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class ProductUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'string|required|max:255',
            'alias' => 'string|required|max:255',
            'category_id' => 'integer|required',
            'status' => 'integer|required',
            'new' => 'integer|required',
            'sale' => 'integer|required',
            'top' => 'integer|required',
            'available' => 'integer|required',
            'cost' => 'string|required',
            'cost_old' => 'string',
            'brand' => 'integer|required',
            'artikul' => 'string|required|max:255',
            'image' => 'string|required|max:255',
            'specifications' => 'string',
            'information' => 'string',
            'title' => 'string|max:255',
            'description' => 'string',
            'keywords' => 'string',
        ];
    }

    /**
     * Format errors
     *
     * @param Validator $validator
     */
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json($validator->errors(), 422));
    }
}
