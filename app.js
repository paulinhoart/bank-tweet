const express = require('express');
const app = express()
const router = express.Router();
const bodyParser = require('body-parser');
const tweets = require('./src/routes/tweets' );

app.use(bodyParser.urlencoded( { extended: false}))
app.use(bodyParser.json())
app.use('/api/', tweets)


module.exports = app;


/*
app.use( (req, res, next) => {
    res.status(200).send({
        mensagem: "Documentacao API - https://github.com/paulinhoart/bank-tweet"
    });
}) */