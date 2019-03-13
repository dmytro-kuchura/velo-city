<?php

return [
    'image' => [
        'variants' => [
            'thumbnail' => [ // Name of the image variant
                'width' => 250,
                'height' => 250,
                'fit' => 'crop'
            ],
            'cart' => [ // Image variant names can be arbitrary
                'width' => 120,
                'height' => 90,
                'fit' => 'crop'
            ]
        ]
    ],
];