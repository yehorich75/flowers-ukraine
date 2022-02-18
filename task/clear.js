const del = require("del");

// Delete
const clear = () => {
    return del("./public")
}

module.exports = clear;