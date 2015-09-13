var gulp = require('gulp');
var browserSync = require('browser-sync');
var jsonServer = require('gulp-json-srv');

// watch files for changes and reload
gulp.task('serve', ['json-server'], function() {
  browserSync({
    server: {
      baseDir: ''
    }
  });

  gulp.watch(['*.html', 'styles/*.css'], browserSync.reload);
});

 
gulp.task('json-server', function () {
    jsonServer.start({
        data: 'scripts/topics.json',
        port: 25000,
        baseUrl: '/api' // change base URl from / to /api 
    });
});