'use strict';

let gulp = require('gulp');
let plumber = require('gulp-plumber');
let concat = require('gulp-concat');
let rename = require('gulp-rename');
let sass = require('gulp-sass');
let sourcemaps = require('gulp-sourcemaps');
let livereload = require('gulp-livereload');
let runSeq = require('run-sequence');

gulp.task('reload', function() {
    livereload.reload();
});

gulp.task('buildJS', [], function() {
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

gulp.task('buildCSS', function() {
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

gulp.task('build', function() {
    runSeq(['buildJS', 'buildCSS']);
});

gulp.task('default', function() {
    runSeq(['build']);

    gulp.watch(['browser/scss/**/*.scss'], function() {
        runSeq('buildCSS', 'reload');
    });

    gulp.watch(['browser/js/**/*.js'], function() {
        runSeq('buildJS', 'reload');
    });

    gulp.watch(['public/*.html', 'public/**/*.html'], function() {
        runSeq('reload');
    });

    livereload.listen();
});
