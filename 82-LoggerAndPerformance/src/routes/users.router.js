
const { Router } = require("express");
const fakeUser = require("../controllers/users.controller");


const router = Router();

router.get("/test", fakeUser);

module.exports = {
    usersRouter: router
};