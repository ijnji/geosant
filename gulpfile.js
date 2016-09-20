'use strict';

let gulp = require('gulp');
let plumber = require('gulp-plumber');
let concat = require('gulp-concat');
let rename = require('gulp-rename');
let sass = require('gulp-sass');
let sourcemaps = require('gulp-sourcemaps');
let runSeq = require('run-sequence');

gulp.task('buildJS', [], () => {
    return gulp.src([
        './browser/js/app.js',
        './browser/js/**/*.js'
    ])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public'));
});

gulp.task('buildCSS', () => {
    var sassCompiler = sass();
    sassCompiler.on('error', console.error.bind(console));

    return gulp.src('./browser/scss/main.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sassCompiler)
    .pipe(sourcemaps.write())
    .pipe(rename('style.css'))
    .pipe(gulp.dest('./public'));
});

gulp.task('build', () => {
    runSeq(['buildJS', 'buildCSS']);
});

gulp.task('default', () => {
    runSeq(['build']);
});
