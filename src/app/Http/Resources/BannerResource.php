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
            'status' => $this->status,
            'date' => $this->created_at->diffForHumans(),
        ];
    }
}
