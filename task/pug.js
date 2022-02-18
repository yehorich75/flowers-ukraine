const { src, dest } = require("gulp");

// Plugins
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const pugs = require("gulp-pug");


// PUG
const pug = () => {
    return src("../src/pug/*.pug")
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "Pug",
                message: error.message
            }))
        }))
        .pipe(pugs({
            pretty: true,
            data: {
                news: require('../data/news.json')
            }
        }))
        .pipe(dest("./public"));
}

module.exports = pug;