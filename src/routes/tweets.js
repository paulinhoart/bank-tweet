/*
   
   * Exposicao dos metodos, Get, Post
   * ROUTES

*/

const express = require('express');
const router = express.Router();
const CreateTweets = require('../../database/tweets');

var Twitter = require('twitter');
//autenticacao - melhor pratica é passar informaçoes por variavel de ambiente
var client = new Twitter ({
    consumer_key: 'KVWEDsKPWPKqdq9VDucJOaDzW',
    consumer_secret: 'Lv0dSQU4rqnlo2LqziREUOapoyZZll9M542qkudGvb25gFCSMI',
    access_token_key: '37733469-l9jPxHBwuAiiBcn7ReZqmPg3Mk8e2nQEF3W7vVuDX',
    access_token_secret: 'xJXP06NfHuzeios6VffCFxHXFLQFLmT8Zz5mgLpuDxR0c'
});

//Apresentacao - Getting All
router.get('/', function (req, res) {
  res.status(200).send({
      description: "Documentacao API - https://github.com/paulinhoart/bank-tweet"
  });
} );

//Search pela palavra/hastag
router.get('/:word', async (req, res, next) => {
  const { word } = req.params
    client.get('search/tweets', { q: `#${word}`, count: '100' }, async function (error, tweets, response) {
      res.status(200).send(tweets)
    });
});

//Metodo POST  - Item 3 do Case
router.post('/', async (req, res, next) => {
  try {
    const words = ["openbanking", "remediation", "devops", "sre", "microservices", "observability", "oauth", "metrics", "logmonitoring", "opentracing"] //Object.values(req.body) //req.body;
    words.forEach(async Words => {
      client.get('search/tweets', { q: `#${Words}`, count: 100 }, async (error, tweets, response) => {
        const Tweets = tweets.statuses;
        const createTweets = new CreateTweets('tweets');
        Tweets.forEach(async element => {
          const date = new Date(element.created_at);
          const timeStamp = date.getTime();
          const newResult = await createTweets
            .gravaRegsitro(element.user.screen_name, element.created_at, timeStamp, element.text, Words, element.user.followers_count, element.lang, element.user.location)
        })
      });
    });
    res.status(200).send({
      data: {
        message: ` Tweet gravado - ${words} `
      }
    });
  } 
  catch (error) {
    console.log(JSON.stringify({
      type: "error",
      error: error.message,
      timestamp: Date.now() / 100,
    }))
    res.status(500).send({
      error: "500 - Internal Server Error"
    })
  }
});

// Retorna do 5 usuárioscom mais seguidores
router.get ('/information/topuser', async (req, res, next) => {
  try {
    const createTweets = new CreateTweets('tweets');
    const result = await createTweets.topFiveUsersFollows()
    res.status(200).send(result)
  } 
  catch (error) {
    console.log(JSON.stringify({
      type: "error",
      error: error.message,
      timestamp: Date.now() / 100,
    }))
    res.status(500).send({
      error: "500 - Internal Server Error"
    })
  }
})

// Retornar Quantidade de Tweet Dia
router.get('/information/dia', async (req, res, next) => {
  try {
    const createTweets = new CreateTweets('tweets');
    const result = await createTweets.totalTweetDia()
    res.status(200).send(result)
  } 
  catch (error) {
    console.log(JSON.stringify({
      type: "error",
      error: error.message,
      timestamp: Date.now() / 100,
    }))
    res.status(500).send({
      error: "500 - Internal Server Error"
    })
  }
});

// Retornar Quantidade total de Tweet por idioma e país
router.get('/information/lang', async (req, res, next) => {
  try {
    const createTweets = new CreateTweets('tweets');
    const result = await createTweets.countHashtagLang()
    res.status(200).send(result)
  } catch (error) {
    console.log(JSON.stringify({
      type: "error",
      app_name: process.env.APP_NAME, //varialvel de ambiente nao definida
      error: error.message,
      timestamp: Date.now() / 100,
    }))
    res.status(500).send({
      error: "500 - Internal Server Error"
    })
  }
});


module.exports = router;
