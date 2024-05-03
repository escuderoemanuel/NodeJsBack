const { Router } = require('express');

const router = Router();


router.get("/operation/simple", (req, res) => {
    let sum = 0;
    for (let i = 0; i < 1_000_000; i++) {
        sum += i;
    };
    res.send({sum});
});


router.get("/operation/complex", (req, res) => {
    let sum = 0;
    for (let i = 0; i < 500_000_000; i++) { //5e8
        sum += i;
    }
    res.send({sum});
});

module.exports = {
    performanceRouter: router 
};