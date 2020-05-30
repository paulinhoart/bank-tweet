const express = require('express');
const app = express()

const tweets = require('./src/routes/tweets' );


app.use('/', tweets)

/*
app.use( (req, res, next) => {
    res.status(200).send({
        mensagem: "Documentacao API - https://github.com/paulinhoart/bank-tweet"
    });
}) */

module.exports = app;
