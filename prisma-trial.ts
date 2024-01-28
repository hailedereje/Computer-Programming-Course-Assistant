import { db } from "./lib/db";

function main(){
    const course = db.course.create({
        data: {
            title: "computer programming"
        }
    })
}

main()