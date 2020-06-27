<?php

namespace App\Repositories;

interface Repository
{
    public function paginate();

    public function find(int $id);

    public function create(array $data);

    public function store(int $id, array $data);

    public function destroy(int $id);
}
