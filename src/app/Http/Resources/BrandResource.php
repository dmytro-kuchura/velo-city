<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class BrandResource extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'alias' => $this->alias,
            'image' => $this->image,
            'status' => $this->status,
            'updated' => $this->updated_at->toDateTimeString(),
            'created' => $this->created_at->toDateTimeString(),
        ];
    }
}
