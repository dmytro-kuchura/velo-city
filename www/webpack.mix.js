let mix = require('laravel-mix');

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

// Frontend
mix.js('resources/assets/js/app.js', 'public/js').sass('resources/assets/sass/app.scss', 'public/css');
// Dashboard
mix.js('resources/admin/js/app.js', 'public/dashboard/js').sass('resources/admin/sass/app.scss', 'public/dashboard/css');
// Login page
mix.js('resources/auth/js/app.js', 'public/auth/js').sass('resources/auth/sass/app.scss', 'public/auth/css');
