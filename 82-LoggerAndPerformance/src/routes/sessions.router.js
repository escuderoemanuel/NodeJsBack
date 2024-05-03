const { loginUser, registerUser } = require("../controllers/sessions.controller");

const { Router } = require("express")


const router = Router();

router.post("/login", loginUser);
router.post("/register", registerUser);

module.exports ={
    sessionsRouter: router 
}