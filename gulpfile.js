"use strict";

var gulp = require("gulp");
var run = require("run-sequence");
var rename = require("gulp-rename");
var del = require("del");

var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");

var concat = require("gulp-concat");
var jsmin = require("gulp-uglyfly");

var imagemin = require("gulp-imagemin");

var plumber = require("gulp-plumber");
var sourcemaps = require("gulp-sourcemaps");

gulp.task("components", function () {
  return gulp.src("source/components/**/*")
    .pipe(plumber())
    .pipe(gulp.dest("app/views"))
});

gulp.task("style", function() {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("app/public/css"))
});

gulp.task("style-prod", function() {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("app/public/css"))
});

gulp.task("script", function () {
  return gulp.src("source/js/**/*.js")
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat("script.js"))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("app/public/js"))
});

gulp.task("script-prod", function () {
  return gulp.src("source/js/**/*.js")
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat("script.js"))
    .pipe(jsmin())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("app/public/js"))
});

gulp.task("images", function () {
  return gulp.src("source/img/**/*")
    .pipe(plumber())
    .pipe(gulp.dest("app/public/img"))
});

gulp.task("images-prod", function () {
  return gulp.src("source/img/**/*")
    .pipe(plumber())
    .pipe(imagemin([
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("app/public/img"))
});

gulp.task("watcher", function () {
    gulp.watch("source/components/**/*", ["components"]);
    gulp.watch("source/sass/**/*.scss", ["style"]);
    gulp.watch("source/js/**/*.js", ["script"]);
    gulp.watch("source/img/**/*", ["images"]);
});

gulp.task("clean", function () {
  return del(["app/public", "app/public"]);
});

gulp.task("dev", function (done) {
  run(
      "clean",
      "components",
      "style",
      "images",
      "script",
      done
  );
});

gulp.task("build", function (done) {
  run(
      "clean",
      "components",
      "style-prod",
      "images-prod",
      "script-prod",
      done
  );
});
