const MongoSingleton = require("./MongoSingleton");



let connInstance01 = MongoSingleton.getInstance();
let connInstance02 = MongoSingleton.getInstance();
let connInstance03 = MongoSingleton.getInstance();

console.log("is same object? ", connInstance01 == connInstance02)