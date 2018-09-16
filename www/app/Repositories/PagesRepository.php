<?php

namespace App\Repositories;

use App\Models\Pages;
use App\Repositories\Repository;

class PagesRepository extends Repository
{
    public function paginate($limit = 10)
    {
        $records = Pages::paginate($limit);

        return $records;
    }

    public function list()
    {
        $records = Pages::all();

        return $records;
    }

    public function getById($ID)
    {
        $record = Blog::find($ID);
        return $record;
    }

    public function delete($ID)
    {
        return Blog::where('id', $ID)->delete();
    }

    public function status($ID)
    {
        /* @var $record Blog */
        $record = Blog::find($ID);
        $record->status = $record->status === 1 ? 0 : 1;
        $record->save();
    }
}