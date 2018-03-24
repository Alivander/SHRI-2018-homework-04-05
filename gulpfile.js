const gulp = require('gulp');
const run = require('run-sequence');
const del = require('del');

const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const csso = require('gulp-csso');

const concat = require('gulp-concat');
const jsmin = require('gulp-uglyfly');

const imagemin = require('gulp-imagemin');

const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('style', () => gulp.src('source/sass/style.scss')
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('app/public/css')));

gulp.task('style-prod', () => gulp.src('source/sass/style.scss')
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(postcss([
    autoprefixer(),
  ]))
  .pipe(csso())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('app/public/css')));

// Таски для изображений и клиентских скриптов оставлены для второго задания,
// хотя в самом приложении они не требуются

gulp.task('script', () => gulp.src('source/js/**/*.js')
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(concat('script.js'))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('app/public/js')));

gulp.task('script-prod', () => gulp.src('source/js/**/*.js')
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(concat('script.js'))
  .pipe(jsmin())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('app/public/js')));

gulp.task('images', () => gulp.src('source/img/**/*')
  .pipe(plumber())
  .pipe(gulp.dest('app/public/img')));

gulp.task('images-prod', () => gulp.src('source/img/**/*')
  .pipe(plumber())
  .pipe(imagemin([
    imagemin.optipng({ optimizationLevel: 3 }),
    imagemin.jpegtran({ progressive: true }),
    imagemin.svgo(),
  ]))
  .pipe(gulp.dest('app/public/img')));

gulp.task('favicon', () => gulp.src('source/favicon.ico')
  .pipe(plumber())
  .pipe(gulp.dest('app/public')));

gulp.task('watcher', () => {
  gulp.watch('source/sass/**/*.scss', ['style']);
  gulp.watch('source/js/**/*.js', ['script']);
  gulp.watch('source/img/**/*', ['images']);
});

gulp.task('clean', () => del(['app/public']));

gulp.task('dev', (done) => {
  run(
    'clean',
    'style',
    'images',
    'favicon',
    'script',
    done,
  );
});

gulp.task('prod', (done) => {
  run(
    'clean',
    'style-prod',
    'images-prod',
    'favicon',
    'script-prod',
    done,
  );
});
