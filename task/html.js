const { src, dest } = require("gulp");

// Plugins
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const fileInclude = require("gulp-file-include");
const htmlmin = require("gulp-htmlmin");
const size = require("gulp-size");



// HTML
const html = () => {
    return src("./src/html/*.html*")
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "HTML",
                message: error.message
            }))
        }))
        .pipe(fileInclude())
        .pipe(size({ title: "Before Compression"}))
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(size({ title: "After Compression"}))
        .pipe(dest("./public"));
}

module.exports = html;