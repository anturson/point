const gulp = require('gulp');
const connect = require('gulp-connect'); // server
const open = require('gulp-open'); // open browser
const concat = require('gulp-concat');
const lint = require('gulp-eslint');
const sourcemaps = require('gulp-sourcemaps');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const debug = require('debug')('app:gulpfile');

const config = {
  port: 9005,
  devBaseUrl: 'http://localhost',
  paths: {
    html: './src/*.html',
    js: './src/**/*.js',
    dist: './dist',
    mainJs: './src/main.js',
    css: [
      'node_modules/bootstrap/dist/css/bootstrap.min.css',
    ],
  },
};

gulp.task('connect', () => {
  connect.server({
    root: ['dist'],
    port: config.port,
    base: config.devBaseUrl,
    livereload: true,
  });
});

gulp.task('open', ['connect'], () => {
  const uri = `${config.devBaseUrl}:${config.port}/`;
  gulp.src('dist/index.html')
    .pipe(open({ uri }));
});

gulp.task('html', () => {
  gulp.src(config.paths.html)
    .pipe(gulp.dest(config.paths.dist))
    .pipe(connect.reload());
});

gulp.task('js', () => {
  const b = browserify({
    entries: config.paths.mainJs,
    debug: true,
    extensions: ['.js', '.jsx'],
    transform: [
      babelify.configure({
        presets: [
          '@babel/env',
          '@babel/react',
        ],
      }),
    ],
  });

  return b.bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .on('error', debug)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(`${config.paths.dist}/scripts`))
    .pipe(connect.reload());
});

gulp.task('css', () => {
  gulp.src(config.paths.css)
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest(`${config.paths.dist}/css`));
});

gulp.task('lint', () => gulp.src(config.paths.js).pipe(lint({ config: '.eslintrc.js' })).pipe(lint.format()));

gulp.task('watch', () => {
  gulp.watch(config.paths.html, ['html']);
  gulp.watch(config.paths.js, ['js', 'lint']);
});

gulp.task('default', ['html', 'js', 'css', 'lint', 'open', 'watch']);
