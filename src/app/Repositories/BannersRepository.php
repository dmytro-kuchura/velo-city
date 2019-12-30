<?php

namespace App\Repositories;

use App\Http\Resources\BannerResource;
use App\Models\Banners;
use App\Models\Enum\BannerStatus;

class BannersRepository
{
    protected $model = Banners::class;

    public function all()
    {
        return $this->model::orderBy('id', 'asc')->get();
    }

    public function paginate()
    {
        return $this->model::orderBy('id', 'desc')->paginate(12);
    }

    public function list()
    {
        return $this->model::where('status', BannerStatus::STATUS_ACTIVE)->get();
    }

    public function find($id)
    {
        $banner = $this->model::where('id', $id)->first();

        return new BannerResource($banner);
    }

    public function store($id, $data)
    {
        return $this->model::where('id', $id)->update([
            'link' => $data['link'],
            'image' => $data['image'],
            'title' => $data['title'],
            'slogan' => $data['slogan'],
            'description' => $data['description'],
            'status' => $data['status'],
        ]);
    }

    public function create($data)
    {
        $model = new $this->model;

        $model->link = $data['link'];
        $model->image = $data['image'];
        $model->title = $data['title'];
        $model->slogan = $data['slogan'];
        $model->description = $data['description'];
        $model->status = $data['status'];

        return $model->save();
    }

    public function updateImage($data)
    {
        return $this->model::where('id', $data['id'])->update(['image' => $data['link']]);
    }

    public function destroy($id)
    {
        return $this->model::where('id', $id)->delete();
    }
}
