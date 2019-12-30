<?php

namespace App\Repositories;

use App\Http\Resources\BrandResource;
use App\Models\Brands;
use App\Models\Enum\BannerStatus;

class BrandsRepository
{
    protected $model = Brands::class;

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
        $brand = $this->model::where('id', $id)->first();

        return new BrandResource($brand);
    }

    public function store($id, $data)
    {
        return $this->model::where('id', $id)->update([
            'name' => $data['name'],
            'alias' => $data['alias'],
            'image' => $data['image'],
            'status' => $data['status'],
        ]);
    }

    public function create($data)
    {
        $model = new $this->model;

        $model->name = $data['name'];
        $model->alias = $data['alias'];
        $model->image = $data['image'];
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
