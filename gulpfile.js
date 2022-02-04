const { src, dest, watch, series, parallel } = require("gulp");

// Plugins
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const fileInclude = require("gulp-file-include");
const htmlmin = require("gulp-htmlmin");
const size = require("gulp-size");
const browserSync = require("browser-sync").create();
const del = require("del");


// HTML
const html = () => {
    return src("./src/html/*.*")
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
        .pipe(dest("./public"))
        .pipe(browserSync.stream());
}

// Delete
const clear = () => {
    return del("./public")
}

// Server
const server = () => {
    browserSync.init({
        server: {
            baseDir: "./public"
        }
    });
}

// Watcher
const watcher = () => {
    watch("./src/html/index.html", html);
}


// Tasks
exports.html = html;
exports.watch = watcher;
exports.clear = clear;

exports.dev = series(clear, html, parallel(watcher, server));

