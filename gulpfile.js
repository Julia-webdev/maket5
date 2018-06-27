var gulp = require ('gulp');
var browserSync = require ('browser-sync');
var sass = require('gulp-sass');
var autoprefixer = require ('gulp-autoprefixer'); 
var concatCss = require('gulp-concat-css');
var gutil = require('gulp-util');
var ftp = require('gulp-ftp');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        proxy: "maket5forwhitehills"
       /* server: "src/" */
    });

    gulp.watch("src/sass/*.sass", ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
    gulp.watch("src/*.php").on('change', browserSync.reload);

});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("src/sass/*.sass")
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(concatCss("style.css"))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});
gulp.task('ftp', function () {
    return gulp.src('src/**')
        .pipe(ftp({
            host: '88.99.148.81',
            user: 'julia259',
            pass: 'bWkY15Pp0m',
            remotePath: 'www/julia28wd.ru/maket5forwhitewill'
        }))
        // you need to have some kind of stream after gulp-ftp to make sure it's flushed 
        // this can be a gulp plugin, gulp.dest, or any kind of stream 
        // here we use a passthrough stream 
        .pipe(gutil.noop());
});
gulp.task('default', ['serve']);