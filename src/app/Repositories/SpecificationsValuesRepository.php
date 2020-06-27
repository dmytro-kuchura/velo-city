<?php

namespace App\Repositories;

use App\Helpers\Text;
use App\Models\SpecificationsValues;

class SpecificationsValuesRepository implements Repository
{
    private $model = SpecificationsValues::class;

    public function paginate()
    {
        //
    }

    public function find(int $id)
    {
        //
    }

    public function create(array $data)
    {
        /** @var SpecificationsValues $model */
        $model = new $this->model;

        $model->specification_id = $data['specification_id'];
        $model->name = $data['name'] ?? null;
        $model->alias = Text::cyrillic(strtolower($data['name']));

        return $model->save();
    }

    public function store(int $id, array $data)
    {
        //
    }

    public function destroy(int $id)
    {
        return $this->model::where('id', $id)->delete();
    }
}
