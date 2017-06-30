var gulp = require('gulp');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var utilities = require('gulp-util');
var del = require('del');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var browserify = require('browserify');
var buildProduction = utilities.env.production;
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var lib = require('bower-files')({
  "overrides":{
    "bootstrap" : {
      "main": [
        "less/bootstrap.less",
        "dist/css/bootstrap.css",
        "dist/js/bootstrap.js"
      ]
    }
  }
});

gulp.task('jshint', () => {
  return gulp.src(['js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('concatInterface', () => {
  return gulp.src(['js/*-interface.js'])
    .pipe(concat('allConcat.js'))
    .pipe(gulp.dest('./tmp'));
});

gulp.task('jsBrowserify', ['concatInterface'], () => {
  return browserify({entries: ["./tmp/allConcat.js"]})
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build/js'));
});

gulp.task('minifyScripts', ['jsBrowserify'], () => {
  return gulp.src('./build/app.js')
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});

gulp.task('clean', () => del(['build', 'tmp']));

gulp.task('bowerJS', () => {
  return gulp.src(lib.ext('js').files)
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});

gulp.task('bowerCSS', () => {
  return gulp.src(lib.ext('css').files)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('bower', ['bowerJS', 'bowerCSS']);

gulp.task('serve', ['build'], () => {
  browserSync.init({
    server: {
      baseDir: './',
      index: 'index.html'
    }
  });
  gulp.watch(['js/*.js'], ['jsBuild']);
  gulp.watch(['*.html'], ['htmlBuild']);
  gulp.watch(['bower.json'], ['bowerBuild']);
  gulp.watch(['sass/*.sass'], ['cssBuild']);
});

gulp.task('htmlBuild', () => browserSync.reload());

gulp.task('bowerBuild', ['bower'], () => browserSync.reload());

gulp.task('jsBuild', ['jsBrowserify', 'jshint'], () => browserSync.reload());

gulp.task('cssBuild', () => {
  return gulp.src('sass/*.sass')
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./build/css'))
  .pipe(browserSync.stream());
});

gulp.task('build', ['clean'], () => {
  if(buildProduction) {
    gulp.start('minifyScripts');
  } else {
    gulp.start('jsBrowserify');
  }
  gulp.start('bower');
  gulp.start('cssBuild');
});
