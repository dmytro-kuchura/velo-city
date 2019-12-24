<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;

class UploadImage
{
    public function upload($request)
    {
        $path = Storage::disk('s3')->put('/banners/', $request->upload);

        return 'https://velo-city.s3-eu-west-1.amazonaws.com/' . $path;
    }
}
