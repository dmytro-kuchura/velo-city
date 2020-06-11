<?php

namespace App\Http\Controllers;

use App\Helpers\Text;
use App\Models\Catalog;
use App\Models\Product;

class ParserController
{
    const LINK = 'https://sporttop.com.ua/all.xml';

    public $data;

    public function __construct()
    {
        $this->data = $this->getData();
    }

    public function parseProducts()
    {
        $xml = simplexml_load_string($this->data);

        foreach ($xml->shop->offers->offer as $item) {
//            if ($item->attributes()->id == 31142) {
//                dd($item);
//            }

            $model = new Product();

            $model->name = $item->model;
            $model->title = $item->model;
            $model->alias = Text::cyrillic(strtolower($item->model));
            $model->category_id = $item->categoryId;
            $model->new = rand(0, 1);
            $model->sale = rand(0, 1);
            $model->top = rand(0, 1);
            $model->cost = $item->price;
            $model->cost_old = $item->oldprice;
            $model->description = $item->description;
            $model->image = is_array($item->picture) ? $item->picture[0] : $item->picture;
            $model->artikul = $item->vendorCode;
            $model->available = $item->available === 'false' ? 0 : 1;

            $model->save();
        }
    }

    public function parseCategories()
    {
        $xml = simplexml_load_string($this->data);

        foreach ($xml->shop->categories->children() as $child) {
            $model = new Catalog();

            $model->id = $child->attributes()->id;
            $model->name = $child->__toString();
            $model->alias = Text::cyrillic(strtolower($child->__toString()));
            $model->parent_id = $child->attributes()->parentId ? $child->attributes()->parentId->__toString() : 0;
            $model->status = 1;

            $model->save();
        }
    }

    public function getData()
    {
        $curl = curl_init();

        curl_setopt_array($curl, [
            CURLOPT_URL => self::LINK,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => 'utf-8'
        ]);

        $data = curl_exec($curl);
        curl_close($curl);

        return $data;
    }
}
