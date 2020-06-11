<?php

namespace App\Http\Controllers;

use App\Helpers\Text;
use App\Models\Product;

class ParserController
{
    public function parseCategories()
    {
        $curl = curl_init();

        curl_setopt_array($curl, [
            CURLOPT_URL => 'https://sporttop.com.ua/all.xml',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => 'utf-8'
        ]);

        $data = curl_exec($curl);
        curl_close($curl);

        $xml = simplexml_load_string($data);
//        var_dump($xml->shop->offers->offer[0]);
//        die;

        foreach ($xml->shop->offers->offer as $item) {
            $model = new Product();

            $model->name = $item->model;
            $model->alias = Text::cyrillic(strtolower($item->model));
            $model->cost = $item->price;
            $model->cost_old = $item->oldprice;
            $model->description = $item->description;
            $model->image = $item->picture;
            $model->available = $item->available === 'false' ? 0 : 1;

            $model->save();
        }
    }
}
