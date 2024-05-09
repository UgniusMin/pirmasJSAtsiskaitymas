let mix = require('laravel-mix');

mix.js('src/index.js','public')
    .sass('src/scss/style.scss','css')
    .setPublicPath('public')