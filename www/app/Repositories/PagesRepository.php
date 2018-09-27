<?php

namespace App\Repositories;

use App\Models\Pages;

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
        $record = Pages::find($ID);

        return $record;
    }

    public function delete($ID)
    {
        return Pages::where('id', $ID)->delete();
    }

    public function status($ID)
    {
        /* @var $record Pages */
        $record = Pages::find($ID);

        $record->status = $record->status === 1 ? 0 : 1;

        $record->save();
    }
}