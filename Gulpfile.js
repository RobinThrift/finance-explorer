var gulp = require('gulp'),
    config = {
        dest: './dist',
        paths: {
            scripts: ['src/*.js', 'src/**/*.js']
        }
    };




gulp.task('lint', function() {
    var jshint = require('gulp-jshint');
    return gulp.src(config.paths.scripts)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('scripts', ['lint'], function() {
    var traceur = require('gulp-traceur');
    return gulp.src(config.paths.scripts, {base: './src'})
        .pipe(traceur())
        .pipe(gulp.dest(config.dest));
});



gulp.task('default', ['scripts']);


gulp.task('watch', ['default'], function() {
    gulp.watch(config.paths.scripts, ['scripts']);
});
