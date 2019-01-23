var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var del = require('del');

gulp.task('startServer', function() {
    (function () {
        gulp.series('temp');
    })();

    browserSync.init({
        server: {
            baseDir: 'temp'
        },
    });

  gulp.watch('app/scss/**/*.scss', gulp.series('sass'));
  gulp.watch("app/*.html").on('change', gulp.series('temp-html', browserSync.reload));
  gulp.watch("app/js/**/*.js").on('change', gulp.series('temp-js', browserSync.reload));
});

gulp.task('sass', function () {
   return gulp.src('app/scss/**/*.scss')
       .pipe(sourcemaps.init())
       .pipe(sass())
       .pipe(sourcemaps.write())
       .pipe(gulp.dest('temp/css'))
       .pipe(browserSync.stream());
});

gulp.task('temp-html', function() {
    return gulp.src('app/*.html')
        .pipe(gulp.dest('temp'))
});

gulp.task('temp-css', function() {
    return gulp.src('app/scss/**/*.scss')
   .pipe(sass())
   .pipe(sourcemaps.write())
   .pipe(gulp.dest('temp/css'))
});

gulp.task('temp-js', function() {
    return gulp.src('app/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('temp/js'))
});

gulp.task('temp', gulp.parallel('temp-html', 'temp-css', 'temp-js'));

gulp.task('clean:temp', function() {
   return del(['temp']);
});

gulp.task('serve', gulp.series('temp', 'startServer'));