<?php

return [
    'modules' => [
        Konekt\AppShell\Providers\ModuleServiceProvider::class => [
            'ui' => [
                'name' => 'Velo-City',
                'url' => '/admin/product'
            ]
        ],
        Vanilo\Framework\Providers\ModuleServiceProvider::class => [
            'image' => [
                'variants' => [
                    'thumbnail' => [
                        'width' => 250,
                        'height' => 188,
                        'fit' => 'fill'
                    ],
                    'medium' => [
                        'width' => 540,
                        'height' => 406,
                        'fit' => 'fill'
                    ]
                ]
            ],
            'currency' => [
                'code' => 'UAH',
                'sign' => '₴',
                // For the format_price() template helper method:
                'format' => '%2$s%1$g' // see sprintf. Amount is the first argument, currency is the second
            ]
        ]
    ]
];
