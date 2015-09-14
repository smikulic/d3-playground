var gulp = require('gulp');
var browserSync = require('browser-sync');
var jsonServer = require('gulp-json-srv');
var concat = require('gulp-concat');

// watch files for changes and reload
gulp.task('serve', ['json-server', 'scripts'], function() {
  browserSync({
    server: {
      baseDir: ''
    }
  });

  gulp.watch(['*.html', 'styles/*.css', 'scripts/**/*.js'], browserSync.reload);
  gulp.watch('scripts/**/*.js', ['scripts']);
});

 
gulp.task('json-server', function () {
    jsonServer.start({
        data: 'scripts/topics.json',
        port: 25000,
        baseUrl: '/api' // change base URl from / to /api 
    });
});
 
gulp.task('scripts', function() {
  return gulp
  	.src(['scripts/d3.min.js', 'scripts/d3.layout.cloud.js', 'scripts/helpers/*.js', 'scripts/components/*.js', 'scripts/app.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist/'));
});