var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var multiDest = require('gulp-multi-dest');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var del = require('del');
var staticFiles = ['app/**/*', '!app/scss', '!app/js', '!app/css'];
var cssMultiDest = ['temp/css', 'app/css'];

gulp.task('startServer', function() {
    (function () {
        gulp.series('compile-all');
    })();

    browserSync.init({
        server: {
            baseDir: 'temp'
        },
    });

  gulp.watch('app/scss/**/*.scss', gulp.series('sass'));
  gulp.watch(staticFiles).on('change', gulp.series('compile-static-files', browserSync.reload));
  gulp.watch("app/js/**/*.js").on('change', gulp.series('compile-js', browserSync.reload));
});

gulp.task('sass', function () {
   return gulp.src('app/scss/**/*.scss')
       .pipe(sourcemaps.init())
       .pipe(sass())
       .pipe(sourcemaps.write())
       .pipe(multiDest(cssMultiDest))
       .pipe(browserSync.stream());
});

gulp.task('compile-static-files', function() {
    return gulp.src('app/**/*')
        .pipe(gulp.dest('temp'))
});

gulp.task('compile-css', function() {
    return gulp.src('app/scss/**/*.scss')
   .pipe(sass())
   .pipe(sourcemaps.write())
   .pipe(multiDest(cssMultiDest))
});

gulp.task('compile-js', function() {
    return gulp.src('app/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('temp/js'))
});

gulp.task('compile-all', gulp.parallel('compile-static-files', 'compile-css', 'compile-js'));

gulp.task('clean:temp', function() {
   return del(['temp']);
});

gulp.task('serve', gulp.series('compile-all', 'startServer'));