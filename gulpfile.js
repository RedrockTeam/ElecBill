var gulp = require('gulp'),
	less = require('gulp-less'),
	cssmin = require('gulp-minify-css'),
	autoprefixer = require('gulp-autoprefixer'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	notify = require('gulp-notify'),
	jshint = require('gulp-jshint'),
	clean = require('gulp-clean'),
	gutil = require('gulp-util');


//less
gulp.task('testLess' , function () {
	return gulp.src('res/less/**/*.less')
	.pipe(less())
	.on('error', function(err) {
		gutil.log('Less Error!', err.message);
		this.end();
	})
	.pipe(autoprefixer())
	.pipe(cssmin())
	.pipe(gulp.dest('dist/assets/css'));
});

//js
gulp.task('testJs' , function () {
	return gulp.src('src/**/*.js')
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
	.pipe(concat('main.js'))
	.pipe(gulp.dest('dist/assets/js'))
	.pipe(rename({suffix:'.min'}))
	.pipe(uglify())
	.pipe(gulp.dest('dist/assets/js'))
	.pipe(notify({message:'Script task complete' }));
});

//clean
gulp.task('clean' , function (){
	return gulp.src(['dist/assests/css','dist/assests/js'],{read : false})
	.pipe(clean());
});

//default
gulp.task('default' , ['clean'] ,function (){
	gulp.start('testLess','testJs','watch');
});

//watch
gulp.task('watch' , function () {
	gulp.watch('res/less/**/*.less',['testLess']);	
	gulp.watch('src/**/*.js',['testJs']);
})
