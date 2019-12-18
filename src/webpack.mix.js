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
mix.js('resources/dashboard/js/auth.js', 'public/js').sass('resources/dashboard/sass/auth.scss', 'public/css');

mix.scripts([
    'resources/dashboard/js/components/jquery.min.js',
    'resources/dashboard/js/components/nicescroll.js',
    'resources/dashboard/js/components/core.js',
    'resources/dashboard/js/components/chart.js',
    'resources/dashboard/js/components/circle-progress.js',
    'resources/dashboard/js/components/moment.min.js',
    'resources/dashboard/js/components/fullcalendar.min.js',
    'resources/dashboard/js/components/owl.carousel.js',
    'resources/dashboard/js/components/app.js',
    'resources/dashboard/js/components/db-default.js',
], 'public/js/dashboard.js').sass('resources/dashboard/sass/dashboard.scss', 'public/css');
