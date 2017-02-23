/*
* @Author: syq
* @Date:   2017-02-22 19:47:41
* @Last Modified by:   syq
* @Last Modified time: 2017-02-22 21:10:21
*/

'use strict';
/**
 * 1.less编译 压缩 合并
 * 2.js 合并 压缩 混淆
 * 3.img复制
 * 4.html压缩
 */

// 在gulpfile中先加载gulp包，因为这个包提供API
var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var browserSync = require('browser-sync');
// 1、less编译 压缩 合并
gulp.task('style',function() {
	// 这里是执行style任务时自动
	gulp.src(['src/styles/*.less','!src/styles/_*.less'])
		.pipe(less())
		.pipe(cssnano())
		.pipe(gulp.dest('dist/styles'))
		.pipe(browserSync.reload({
		      stream: true
		    }));
});

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

// 2.js 合并 压缩 混淆
gulp.task('script',function() {
	gulp.src('src/scripts/*.js')
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/scripts'))
		.pipe(browserSync.reload({
		      stream: true
		    }));
});

// 3、图片复制
gulp.task('image',function() {
	gulp.src('src/images/*.*')
		.pipe(gulp.dest('dist/images'))
		.pipe(browserSync.reload({
		      stream: true
		    }));
});

// 4、html
var htmlmin = require('gulp-htmlmin');
gulp.task('html',function() {
	gulp.src('src/*.html')
		.pipe(htmlmin({
			collapseWhitespace: true,
			removeComments:true
		}))
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.reload({
		      stream: true
		    }));
});

gulp.task('serve',function() {
	browserSync({
		server: {
			baseDir:['dist']
		}
	}, function(err, bs) {
	    console.log(bs.options.getIn(["urls", "local"]));
	});

	gulp.watch('src/styles/*.less',['style']);
	gulp.watch('src/scripts/*.js',['script']);
	gulp.watch('src/images/*.less',['image']);
	gulp.watch('src/*.html',['html']);
})