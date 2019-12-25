<?php

namespace App\Services;

use Image;
use Illuminate\Support\Facades\Storage;

class UploadImage
{
    public function upload($request, $params)
    {
        foreach ($params as $key => $value) {
            if (isset($value['width'])) {
                $img = Image::make($request->image)->fit($value['width'], $value['height'])->encode('jpg');
                // paste another image
                // $img->insert(public_path('images/bar.png'));
                // create a new Image instance for inserting
                // $watermark = Image::make(public_path('watermark.png'));
                // $img->insert($watermark, 'center');
                // insert watermark at bottom-right corner with 10px offset
                // $img->insert(public_path('images/bar.png'), 'bottom-right', 10, 10);
            } else {
                $img = Image::make($request->image)->encode('jpg');
            }

            $path = Storage::disk('s3')->put('/banners/' . $value['path'], $request->image, (string)$img);
        }

        return 'https://velo-city.s3-eu-west-1.amazonaws.com/' . $path;
    }

    public static function quickRandom($length = 16)
    {
        $pool = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

        return substr(str_shuffle(str_repeat($pool, $length)), 0, $length);
    }
}
