var gulp = require('gulp'); 

var jshint = require('gulp-jshint');
var sass = require('gulp-sass');

gulp.task('sass', function(){
	return gulp.src('public/sass/*.scss')
				.pipe(sass())
				.pipe(gulp.dest('public/css'));
}); 

gulp.task('lint', function(){
	return gulp.src('public/js/*.js')
				.pipe(jshint())
				.pipe(jshint.reporter('default'));
});

gulp.task('watch', function(){
	gulp.watch('public/js/*.js', ['lint']);
	gulp.watch('public/sass/*.scss', ['sass']);
});

gulp.task('default', ['watch']);