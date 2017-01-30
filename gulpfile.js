var gulp = require('gulp');

var del = require('del');
var sass = require('gulp-sass');
var gulpIf = require('gulp-if');
var cache = require('gulp-cache');
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();
const chmod = require('gulp-chmod');
 
gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
});

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'))
});

gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
});

gulp.task('chm', function (){
    gulp.src('app/scss/**/*.scss')
        .pipe(chmod({
            owner: {
                read: true,
                write: true,
                execute: true
            },
            group: {
                execute: true
            },
            others: {
                execute: true
            }
        }))
        .pipe(gulp.dest('app/css'))
});

gulp.task('watch', ['sass','browserSync'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']); 
  // gulp.watch(['app/*.html','app/js/**/*.js','app/css/**/*.css'], ['useref']); 
  gulp.watch(['app/*.html','app/js/**/*.js'], browserSync.reload); 
});

gulp.task('clean:dist', function() {
  return del.sync('dist');
})

gulp.task('build', function(callback) {
  runSequence(['chm', 'clean:dist','sass'],
    ['useref','images','fonts'],
    callback
  )
})