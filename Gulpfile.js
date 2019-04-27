/* CONFIG
 * * * * * * * * * * * * * * * * * * * * *  * * * * * * * * * * * * * * * * * * * * * * */

const conf = {
  opt: {
    header: '/*\n * Bootstrap Helper v1.0.1\n * @author Timur Valiyev\n * @link https://webprowww.github.io\n */\n\n',
    stylus: { compress: true },
    prefixer: { browsers:['last 2 versions'], cascade:false },
    livereload: { basePath: './public_html/' },
    include: { hardFail:false }
  },

  default: {
    stylusWatch: './src/stylus/**/*.styl',
    stylusSrc: './src/stylus/main.styl',
    stylusDest: './public_html/css',

    htmlWatch: './src/html/**/*.html',
    htmlSrc: './src/html/*.html',
    htmlDest: './public_html'
  },

  build: {
    stylusSrc: './src/stylus/bootstrap-helper.styl',
    stylusDest: './dist'
  }
};

/* PLUGINS
 * * * * * * * * * * * * * * * * * * * * *  * * * * * * * * * * * * * * * * * * * * * * */

const { src, dest, watch } = require('gulp');

const livereload = require('gulp-livereload');
const stylus = require('gulp-stylus');
const include = require('gulp-include');
const prefixer = require('gulp-autoprefixer');
const header = require('gulp-header');

/* FUNCTIONS
 * * * * * * * * * * * * * * * * * * * * *  * * * * * * * * * * * * * * * * * * * * * * */

function error(err, done) {
  console.log(err.message);
  return done();
}

function compileStylus(config, done) {
  return src(config.stylusSrc)
    .on('end', function() { return done(); })
    .on('error', function (err) { return error(err, done); })
    .pipe(stylus(conf.opt.stylus).on('error', function(err) { return error(err, done); }))
    .pipe(prefixer(conf.opt.prefixer).on('error', function(err) { return error(err, done); }))
    .pipe(header(conf.opt.header))
    .pipe(dest(config.stylusDest))
    .pipe(livereload());
}

function includeHtml(config, done) {
  return src(config.htmlSrc)
    .on('end', function() { return done(); })
    .on('error', function (err) { return error(err, done); })
    .pipe(include(conf.opt.include).on('error', function(err) { return error(err, done); }))
    .pipe(dest(config.htmlDest))
    .pipe(livereload());
}

/* TASKS
 * * * * * * * * * * * * * * * * * * * * *  * * * * * * * * * * * * * * * * * * * * * * */

function defaultStylus(done) { compileStylus(conf.default, done); }
function defaultHtml(done) { includeHtml(conf.default, done); }

exports.default = function() {
  livereload.listen(conf.opt.livereload);
  watch(conf.default.stylusWatch, defaultStylus);
  watch(conf.default.htmlWatch, defaultHtml);
};

exports.build = function(done) { compileStylus(conf.build, done); };
