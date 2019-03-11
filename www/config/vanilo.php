<?php
/**
 * Created by PhpStorm.
 * User: Dmitry
 * Date: 11.03.2019
 * Time: 11:42
 */

return [
    // ...
    'image'       => [
        'variants' => [
            'thumbnail' => [ // Name of the image variant
                'width'  => 250,
                'height' => 250,
                'fit'    => 'crop'
            ],
            'cart' => [ // Image variant names can be arbitrary
                'width'  => 120,
                'height' => 90,
                'fit'    => 'crop'
            ]
        ]
    ]
    //...
];