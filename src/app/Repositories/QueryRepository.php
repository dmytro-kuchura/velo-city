<?php

namespace App\Repositories;

use App\Models\Query;

class QueryRepository
{
    private $model = Query::class;

    public function paginate()
    {
        // TODO: Implement paginate() method.
    }

    public function list(int $limit)
    {
        return $this->model::orderBy('id', 'asc')->limit($limit)->get();
    }

    public function find(int $id)
    {
        // TODO: Implement find() method.
    }

    public function create($data)
    {
        /** @var Query $model */
        $model = new $this->model;

        $model->data = $data;
        $model->save();
    }

    public function store(int $id, array $data)
    {
        // TODO: Implement store() method.
    }

    public function destroy(int $id)
    {
        return $this->model::where('id', $id)->delete();
    }
}
