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
const jsonServer = require('json-server');
const debug = require('debug')('app:gulpfile');

const babelConfig = require('./babel.config');

const config = {
  port: 9005,
  apiPort: 9006,
  devBaseUrl: 'http://localhost',
  paths: {
    html: './src/*.html',
    js: ['./src/**/*.{js,jsx}'],
    dist: './dist',
    mainJs: './src/main.js',
    css: [
      'node_modules/bootstrap/dist/css/bootstrap.min.css',
    ],
    images: './src/images/*',
    apiDb: 'db.json',
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
    transform: [babelify.configure(babelConfig),
    ],
  });

  return b.bundle()
    .on('error', debug)
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

gulp.task('images', () => {
  gulp.src(config.paths.images)
    .pipe(gulp.dest(`${config.paths.dist}/images`))
    .pipe(connect.reload());

  gulp.src('./src/favicon.icon')
    .pipe(gulp.dest(config.paths.dist));
});

gulp.task('lint', () => gulp.src(config.paths.js).pipe(lint({ config: '.eslintrc.js' })).pipe(lint.format()));

gulp.task('watch', () => {
  gulp.watch(config.paths.html, ['html']);
  gulp.watch(config.paths.js, ['js', 'lint']);
});

gulp.task('api', () => {
  const server = jsonServer.create();
  const router = jsonServer.router(config.paths.apiDb);
  const middlewares = jsonServer.defaults();

  server.use(middlewares);
  server.use(router);
  server.listen(config.apiPort);
});

gulp.task('default', ['html', 'js', 'css', 'images', 'lint', 'open', 'api', 'watch']);
