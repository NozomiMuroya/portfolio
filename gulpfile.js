const { src, dest, parallel, watch } = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const sassGlob = require('gulp-sass-glob');
const csso = require('gulp-csso');
const sourcemaps = require('gulp-sourcemaps');

const path = {
  scss: 'src/scss/**/*.scss'
}

function css() {
  return src(path.scss)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(csso())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('assets'));
}

function watchFiles() {
  watch([path.scss], css);
}

const build = parallel(watchFiles, css);

exports.default = build;

const gulp = require('gulp');
const webserver = require('gulp-webserver');

gulp.task('webserver', function () {
    gulp.src('dist') // 公開したい静的ファイルを配置したディレクトリを指定する
        .pipe(webserver({
            host: 'localhost',
            port: 8000,
            livereload: true
        }));
});
