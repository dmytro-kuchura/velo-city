<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class BannerResource extends Resource
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
            'title' => $this->title,
            'link' => $this->link,
            'slogan' => $this->slogan,
            'description' => $this->description,
            'status' => $this->status,
            'updated' => $this->updated_at->toDateTimeString(),
            'created' => $this->created_at->toDateTimeString(),
        ];
    }
}
