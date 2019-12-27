<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class ProductResource extends Resource
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
            'category_id' => $this->category_id,
            'status' => $this->status,
            'new' => $this->new,
            'sale' => $this->sale,
            'top' => $this->top,
            'available' => $this->available,
            'cost' => $this->cost,
            'cost_old' => $this->cost_old,
            'brand' => $this->brand,
            'artikul' => $this->artikul,
            'image' => $this->image,
            'specifications' => $this->specifications,
            'information' => $this->information,
            'title' => $this->title,
            'description' => $this->description,
            'keywords' => $this->keywords,
        ];
    }
}
