<?php

namespace App\Traits;

/**
 * Trait for ShortDescriptions
 *
 * @package App\Traits
 */
trait ShortDescription
{
    public static function getShortContent($content)
    {
        $string = strip_tags($content);
        $string = substr($string, 0, 350);
        $string = rtrim($string, "!,.-");
        $string = substr($string, 0, strrpos($string, ' '));

        return $string . ".... ";
    }
}
