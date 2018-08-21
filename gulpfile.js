'use strict';

// Подключаем Gulp
var gulp = require("gulp"); 

// Подключаем плагины Gulp
var watch = require('gulp-watch'),
	sourcemaps = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin'), 
    cache = require('gulp-cache'),
    concat = require("gulp-concat"), 
    uglify = require("gulp-uglify"), 
	clean = require('gulp-clean'),
	minify = require('gulp-minify-css'),
	rigger = require('gulp-rigger'),
	browserSync = require('browser-sync'),
	rimraf = require('rimraf'),
    mainBowerFiles = require('main-bower-files'), 
    filter = require('gulp-filter'),    
	reload = browserSync.reload;
	
// Пути
var path = {
    build: { 
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: { 
        html: 'src/*.html',
        js: 'src/js/*.js',
        css: 'src/css/*.css',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: { 
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        css: 'src/css/**/*.css',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build/'
};

// Сервер
var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Test"
};

// Задачи
gulp.task("html", function() {
    gulp.src(path.src.html)
		.pipe(rigger())
		.pipe(gulp.dest(path.build.html))
		.pipe(reload({stream: true}));
});

gulp.task('css', function(){
   gulp.src(path.src.css)
	   .pipe(concat('main.css'))
	   .pipe(sourcemaps.init())
	   .pipe(minify())
	   .pipe(sourcemaps.write())
	   .pipe(gulp.dest(path.build.css))
	   .pipe(reload({stream: true}));
});

/*gulp.task("js", function() {
    gulp.src(path.src.js) 
		.pipe(rigger())
		.pipe(sourcemaps.init())
        .pipe(uglify()) 
		.pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
		.pipe(reload({stream: true}));
});*/
gulp.task("js", function() {
    gulp.src(mainBowerFiles().concat(path.src.js)) 
        .pipe(filter('**/*.js'))
        .pipe(concat('main.js'))
        .pipe(sourcemaps.init())
        .pipe(uglify()) 
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('img', function() {
    gulp.src(path.src.img)
        .pipe(cache(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true
        })))
        .pipe(gulp.dest(path.build.img))
		.pipe(reload({stream: true}));
});

gulp.task('fonts', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html');
    });
    watch([path.watch.css], function(event, cb) {
        gulp.start('css');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('img');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts');
    });
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('build', [
    'html',
    'js',
    'css',
    'fonts',
    'img'
]);

gulp.task('default', [
    'build', 
    'webserver', 
    'watch'
]);