import connect from 'gulp-connect';
import gulp from 'gulp';
import sass from 'gulp-sass';
import cleanCss from 'gulp-clean-css';
import compass from 'gulp-compass';
import handlebars from 'gulp-compile-handlebars';
import rename from 'gulp-rename';
import browserify from 'browserify';
import babelify from 'babelify';
import util from 'gulp-util';
import clean from 'gulp-clean';
import source from 'vinyl-source-stream';
import ghPages from 'gulp-gh-pages';

const srcSass = 'app/scss/app.scss';
const distCss = 'dist/css';

gulp.task('connect', () => {
  connect.server({
    root: 'dist',
    livereload: true
  });
});

gulp.task('html', () => {
  gulp.src('dist/*.html')
    .pipe(connect.reload());
});

gulp.task('deploy', function () {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

gulp.task('handlebars', ['clean-html'], ()=> {

  const templateData = {
    firstName: 'Kaanon'
  };

  const options = {
    ignorePartials: true, //ignores the unknown footer2 partial in the handlebars template, defaults to false
    batch: ['./app/pages/partials'],
    helpers: {
      capitals: function (str) {
        return str.toUpperCase();
      }
    }
  };

  return gulp.src('app/pages/*.handlebars')
    .pipe(handlebars(templateData, options))
    .pipe(rename((path)=> {
      path.extname = '.html';
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('scripts', ['clean-js'], () => {
  browserify({debug: true})
    .transform(babelify)
    .require('./app/js/app.js')
    .bundle()
    .on('error', util.log)
    .pipe(source('app.js'))
    .pipe(gulp.dest('./dist/js'))
});


gulp.task('sass', () => {
  return gulp.src(srcSass)
    .pipe(compass({
      css: distCss,
      sass: 'app/scss',
      style: 'compressed'
    }))
    .pipe(cleanCss());
});

gulp.task('copy', ()=> {
  return gulp.src(['app/assets/**/*.*'])
    .pipe(gulp.dest('dist'));
});

gulp.task('clean-html', ()=> {
  return gulp.src('dist/*.html')
    .pipe(clean())
});

gulp.task('clean-js', ()=> {
  return gulp.src('dist/js/app.js')
    .pipe(clean())
});

gulp.task('watch', () => {
  gulp.watch(['dist/*.html'], ['html']);
  gulp.watch(['app/pages', 'app/pages/*.handlebars', './app/pages/**/*.handlebars'], ['handlebars']);
  gulp.watch(['app/js/**/*.js'], ['scripts']);
  gulp.watch(['app/scss/*.scss'], ['sass']);
});

gulp.task('clean', () => {
  return gulp.src('dist')
    .pipe(clean())
});

gulp.task('build', ['handlebars', 'sass', 'scripts']);

gulp.task('dev', ['build', 'connect', 'watch']);