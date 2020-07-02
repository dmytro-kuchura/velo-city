<?php

namespace App\Traits;

/**
 * Trait for OriginalImage
 *
 * @package App\Traits
 */
trait OriginalImage
{
    public static function getOriginalImageLink(string $image)
    {
        return str_replace('/main/', '/original/', $image);
    }
}
