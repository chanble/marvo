var gulp = require('gulp');
var sass = require('gulp-sass');

var paths = {
  src: './client/src/',
  dest: './client/public/'
}


gulp.task('sass', function () {
    gulp.src(paths.src + '**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(paths.dest));
});

gulp.task('watch', ['sass'], function () {

  gulp.watch(paths.src + '**/*', ['sass'])
})