"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("./lib/db");
function main() {
    var course = db_1.db.course.create({
        data: {
            title: "computer programming"
        }
    });

    console.log(course.then(data=> data))
}

main()
