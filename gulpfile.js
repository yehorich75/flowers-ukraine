const { watch, series, parallel } = require("gulp");
const browserSync = require("browser-sync").create();

// Tasks
const clear = require('./task/clear.js');
const pug = require('./task/pug.js');

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
    watch("./src/pug/**/*.pug", pug).on("all", browserSync.reload);
}

// Task
exports.pug = pug;
exports.watch = watcher;
exports.clear = clear;

exports.dev = series(
    clear,
    pug,
    parallel(watcher, server)
);

