var gulp  = require('gulp'),
    del   = require('del'),
    pug   = require('gulp-pug'),
    shell = require('gulp-shell'),
    ts    = require('gulp-typescript')

var tsProject = ts.createProject('tsconfig.json')
var path = {
    assets:  ['app/assets/**/*'],
    views:   ['app/views/**/*.pug', '!app/views/**/_*.pug'],
    scripts: ['app/src/**/*.ts']
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

gulp.task('compile', function() {
    return tsProject.src()
        .pipe(ts(tsProject))
        .js.pipe(gulp.dest('./dist/assets/js'))
})

gulp.task('build', ['assets', 'views'])
gulp.task('build:prod', ['clean', 'build'])

gulp.task('watch', ['build'], function() {
    gulp.watch(path.assets,  ['assets'])
    gulp.watch(path.views,   ['views'])
    gulp.watch(path.scripts, ['compile'])
})

gulp.task('run', ['watch'], shell.task([
    'npm start'
]))
