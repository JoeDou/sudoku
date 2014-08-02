var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');

var paths = {
  sass: ['styles/scss/**/*.scss']
};

gulp.task('sass', function () {
    return gulp.src('./styles/scss/main.scss')
        .pipe(sass())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./styles'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass']);
});

gulp.task('default', ['sass', 'watch']);