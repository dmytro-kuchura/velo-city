const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/public/js/app.js', 'public/js').sass('resources/public/sass/app.scss', 'public/css');
mix.js('resources/dashboard/js/dashboard.js', 'public/js').sass('resources/dashboard/sass/dashboard.scss', 'public/css');
