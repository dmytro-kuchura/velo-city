<?php

namespace App\Http\Controllers;

use App\Helpers\Text;
use App\Models\Catalog;
use App\Models\Product;
use App\Models\ProductImages;
use App\Models\Query;
use App\Services\UploadImage;

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
            $model = new Query();

            $model->data = json_encode($item);
            $model->save();
        }
    }

    public function uploadProduct()
    {
        set_time_limit(800);

        $items = Query::orderBy('id', 'asc')->limit(15)->get();

        /** @var Query $item */
        foreach ($items as $item) {
            $product = json_decode($item->data, true);
            dd($product->description);

            $model = Product::where('alias', Text::cyrillic(strtolower($product->model)))->first();

            if (!$model) {
                $model = new Product();
            }


            $model->name = $product->model;
            $model->title = $product->model;
            $model->alias = Text::cyrillic(strtolower($product->model));
            $model->category_id = $product->categoryId;
            $model->new = rand(0, 1);
            $model->sale = rand(0, 1);
            $model->top = rand(0, 1);
            $model->cost = $product->price;
            $model->cost_old = $product->oldprice;
            $model->information = $product->description;
            $model->artikul = $product->vendorCode;
            $model->available = 1;

            $model->save();

            $model->image = isset($product->picture) ? $this->uploadImages((array)$product->picture, $model->id) : null;

            if ($model->save()) {
                $item->delete();
            }

            echo 'Imported: ' . $product->model . ' / ' . $item->id . '<br>';
        }
    }

    public function uploadImages(array $images, int $id): string
    {
        if (count($images) === 1) {
            $service = new UploadImage();
            $link = $service->uploadByLink(reset($images), 'products');

            $model = new ProductImages();
            $model->link = $link;
            $model->product_id = $id;
            $model->status = 1;
            $model->save();

            return $model->link;
        }

        foreach ($images as $image) {
            $service = new UploadImage();
            $link = $service->uploadByLink($image, 'products');

            $model = new ProductImages();
            $model->link = $link;
            $model->product_id = $id;
            $model->status = 1;
            $model->save();
        }

        return $model->link;
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
