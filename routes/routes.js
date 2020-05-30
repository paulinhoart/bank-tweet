const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.status(200).send({
        title: "API REST Tweets - Search",
        version: "1.0.0",
        usege: "For use api, access /api and set your x-access-token on the header"
    });
});

module.exports = router;