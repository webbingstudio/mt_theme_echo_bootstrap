var gulp = require('gulp');

var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var compass = require('gulp-compass');
var cssmin = require('gulp-cssmin');
var uglify = require('gulp-uglify');

// copy
gulp.task( 'copy', function() {
    gulp.src( '_js/**/*.js' )
    .pipe( gulp.dest( 'dist/themes/echo_bootstrap/blog_static/js' ) );
} );

// compass
gulp.task('compass', function(){
    gulp.src('_scss/**/*.scss')
        .pipe(plumber())
        .pipe(compass({
            config_file: 'config.rb',
            comments: false,
            css: 'dist/themes/echo_bootstrap/blog_static/css/',
            sass: '_scss/'
        })
    );
});

// cssmin
gulp.task('cssmin', function () {
  gulp.src([
    'dist/themes/echo_bootstrap/blog_static/css/bootstrap-theme.css',
    'dist/themes/echo_bootstrap/blog_static/css/utility.css',
    'dist/themes/echo_bootstrap/blog_static/css/style.css',
    '!dist/themes/echo_bootstrap/blog_static/css/**/*.min.css'
  ])
  .pipe(cssmin())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('dist/themes/echo_bootstrap/blog_static/css'));
});

//uglify
gulp.task('js', function() {
  gulp.src([
    '_js/**/all.js',
    '!dist/themes/echo_bootstrap/blog_static/**/*.min.js'
  ])
  .pipe(uglify())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('dist/themes/echo_bootstrap/blog_static/js'));
});

//watch
gulp.task('watch', function(){
    gulp.watch('_scss/**/*.scss', function(event) {
        gulp.run('compass');
    });
    gulp.watch('dist/themes/echo_bootstrap/blog_static/css/**/*.css', function(event) {
        gulp.run('cssmin');
    });
    gulp.watch('_js/**/*.js', function(event) {
        gulp.run('copy');
        gulp.run('js');
    });
});

gulp.task('default', function(){
    gulp.run('watch');
});

