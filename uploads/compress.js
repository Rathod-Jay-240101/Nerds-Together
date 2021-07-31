const fs = require("fs");
const config = require("config");
const tinify = require("tinify");
tinify.key = config.get("tinifyKey");

function check() {
    fs.readdir(__dirname, (err, files) => {
        if (err) {
            console.log(err);
        } else {
            files.forEach((file) => {
                const name = __dirname + "\\" + file;
                const stats = fs.statSync(name);
                const fileSize = stats.size / 1024.0;
                if (fileSize > 150) {
                    const source = tinify.fromFile(name);
                    const resize = source.resize({
                        method: "cover",
                        width: 400,
                        height: 400,
                    });
                    resize.toFile(name);
                    console.log(name);
                }
            });
        }
    });
}

function deleteFile(fileName) {
    const name = __dirname + "\\" + fileName + ".jpg";
    fs.unlink(name, (error) => {
        if (error) {
            console.log(error);
        } else {
            console.log(name + " Is Deleted");
        }
    });
}

module.exports = { check, deleteFile };
