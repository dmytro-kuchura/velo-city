<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Image Driver
    |--------------------------------------------------------------------------
    |
    | Intervention Image supports "GD Library" and "Imagick" to process images
    | internally. You may choose one of them according to your PHP
    | configuration. By default PHP's "GD Library" implementation is used.
    |
    | Supported: "gd", "imagick"
    |
    */

    'driver' => 'gd',

    /*
    |--------------------------------------------------------------------------
    | Image cropping sizes
    |--------------------------------------------------------------------------
    |
    | "path": save directory
    | "width": image width
    | "height": image height
    | "resize": need resize or not "1" or "0"
    | "watermark": need watermark or not "1" or "0"
    |
    */

    'crop' => [
        'banners' => [
            [
                'path' => 'main',
                'width' => 1920,
                'height' => 700,
                'resize' => 1,
                'watermark' => 0,
            ],
            [
                'path' => 'original',
                'resize' => 0,
            ],
        ],
        'products' => [
            [
                'path' => 'main',
                'width' => 750,
                'height' => 750,
                'resize' => 1,
                'watermark' => 0,
            ],
            [
                'path' => 'original',
                'resize' => 0,
            ],
        ],
        'brands' => [
            [
                'path' => 'main',
                'width' => 170,
                'height' => 120,
                'resize' => 0,
                'watermark' => 0,
            ],
            [
                'path' => 'original',
                'resize' => 0,
            ],
        ],
    ],
];
