var gulp  = require('gulp'),
    del   = require('del'),
    pug   = require('gulp-pug'),
    shell = require('gulp-shell')

var path = {
    assets: 'app/assets/**/*',
    views:  ['app/**/*.pug', '!app/**/_*.pug']
}

gulp.task('clean', function() {
    return del('./dist')
})

gulp.task('assets', function () {
    return gulp.src(path.assets)
        .pipe(gulp.dest('./dist/assets'))
})

gulp.task('views', function() {
    return gulp.src(path.views)
        .pipe(pug())
        .pipe(gulp.dest('./dist'))
})

gulp.task('build', ['assets', 'views'])
gulp.task('build:prod', ['clean', 'build'])

gulp.task('watch', ['build'], function() {
    gulp.watch(path.assets, ['assets'])
    gulp.watch(path.views,  ['views'])
})

gulp.task('run', ['watch'], shell.task([
    'npm start'
]))
