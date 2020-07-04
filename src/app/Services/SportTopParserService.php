<?php

namespace App\Services;

use App\Helpers\Text;
use App\Models\Catalog;
use App\Models\Query;
use App\Repositories\ProductImagesRepository;
use App\Repositories\ProductsRepository;
use App\Repositories\QueryRepository;

class SportTopParserService
{
    const LINK = 'https://sporttop.com.ua/all.xml';

    public $data;

    /** @var QueryRepository */
    public $queryRepository;

    /** @var ProductsRepository */
    public $productsRepository;

    /** @var ProductImagesRepository */
    public $productImagesRepository;

    public function __construct(
        QueryRepository $queryRepository,
        ProductsRepository $productsRepository,
        ProductImagesRepository $productImagesRepository
    )
    {
        $this->queryRepository = $queryRepository;
        $this->productsRepository = $productsRepository;
        $this->productImagesRepository = $productImagesRepository;
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

    public function addToQuery()
    {
        ini_set('memory_limit', '256M');
        set_time_limit(8000);

        $this->data = $this->getData();

        $xml = simplexml_load_string($this->data);

        foreach ($xml->shop->offers->offer as $item) {
            $this->queryRepository->create(json_encode($item));
        }
    }

    public function uploadProductFromQuery()
    {
        $items = $this->queryRepository->list(10);

        $count = 0;

        /** @var Query $item */
        foreach ($items as $item) {
            try {
                $itemData = json_decode($item->data);

                $product = $this->productsRepository->findByArtikul($itemData->vendorCode);

                $data = [
                    'name' => $itemData->model,
                    'title' => $itemData->model,
                    'alias' => Text::cyrillic(strtolower($itemData->model)),
                    'category_id' => $itemData->categoryId,
                    'new' => rand(0, 1),
                    'sale' => rand(0, 1),
                    'top' => rand(0, 1),
                    'cost' => $itemData->price,
                    'cost_old' => $itemData->oldprice,
                    'information' => is_string($itemData->description) ? $itemData->description : null,
                    'artikul' => $itemData->vendorCode,
                    'available' => 1,
                    'description' => $itemData->model .' ➤➤➤ Купить по цене №➊ в Херсоне ➤ Рассрочка 0% ✔ Официальная гарантия ☎ (050) 570-19-00 ✔ Velo-Сity | Веломагазин Velo-Сity',
                ];

                if (!$product) {
                    $this->productsRepository->create($data);
                } else {
                    $this->productsRepository->store($product->id, $data);
                }

                if (isset($itemData->picture)) {
                    $product = $this->productsRepository->findByArtikul($itemData->vendorCode);

                    $imageLink = $this->uploadImages((array)$itemData->picture, $product->id);

                    $this->productsRepository->updateImage([
                        'id' => $product->id,
                        'link' => $imageLink
                    ]);
                }

            } catch (\Throwable $exception) {
                return 0;
            }

            $this->queryRepository->destroy($item->id);

            $count++;
        }

        return $count;
    }

    public function uploadImages(array $images, int $id): string
    {
        $link = '';

        $this->productImagesRepository->destroy($id);

        if (count($images) === 1) {
            $service = new UploadImageService();
            $link = $service->uploadByLink(reset($images), 'products');

            $this->productImagesRepository->create([
                'link' => $link,
                'product_id' => $id
            ]);

            return $link;
        }

        foreach ($images as $image) {
            $service = new UploadImageService();
            $link = $service->uploadByLink($image, 'products');

            $this->productImagesRepository->create([
                'link' => $link,
                'product_id' => $id
            ]);
        }

        return $link;
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

//            $model->save();
        }
    }

}
