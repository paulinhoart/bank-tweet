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



//Search pela palavra/hastag
router.get('/:word', async (req, res, next) => {
  const { word } = req.params
    client.get('search/tweets', { q: `#${word}`, count: '100' }, async function (error, tweets, response) {
      res.status(200).send(tweets)
    });

    elasticClient.index({
      index: 'loggings-bank-tweet-api',
      type: 'request', //
      id: req.body.id,
      routing: req.method,
      body: {
        title: req.originalUrl,
        tags: [word],
        published: true,
      }
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
    counter.inc() // Quantidade de requisiçoes
    res.status(200).send({
      data: {
        message: ` Tweet gravado - ${words} `
      }
    });
  } 
  catch (error) {
    const errorBad = histogram.startTimer({ method: 'GET'});
    console.log(JSON.stringify({
      type: "error",
      error: error.message,
      timestamp: Date.now() / 100,
    }))
    errorBad( {code: '500'});
    res.status(500).send({
      error: "500 - Internal Server Error"
    })
  }
});

// Retorna do 5 usuárioscom mais seguidores
router.get ('/information/topuser', async (req, res, next) => {
  try {
    const latencia = histogram.startTimer()
    const createTweets = new CreateTweets('tweets');
    const result = await createTweets.topFiveUsersFollows()
    res.status(200).send(result)
    counter.inc() // Quantidade de requisiçoes
    const seconds = latencia();
    histogram.labels(req.method, req.route.path, res.statusCode).observe(seconds)
  } 
  catch (error) {
    const errorBad = histogram.startTimer({ method: 'GET'});
    console.log(JSON.stringify({
      type: "error",
      error: error.message,
      timestamp: Date.now() / 100,
    }))
    errorBad( {code: '500'});
    res.status(500).send({
      error: "500 - Internal Server Error"
    })
  }
})

// Retornar Quantidade de Tweet Dia

router.get('/information/dia', async (req, res, next) => {
  try {
    const latencia = histogram.startTimer()
    const createTweets = new CreateTweets('tweets');
    const result = await createTweets.totalTweetDia()
    res.status(200).send(result)
    counter.inc() // Quantidade de requisiçoes
    const seconds = latencia();
    histogram.labels(req.method, req.route.path, res.statusCode).observe(seconds)
  } 
  catch (error) {
    const errorBad = histogram.startTimer({ method: 'GET'});
    console.log(JSON.stringify({
      type: "error",
      error: error.message,
      timestamp: Date.now() / 100,
    }))
    errorBad( {code: '500'});
    res.status(500).send({
      error: "500 - Internal Server Error"
    })
  }
});

// Retornar Quantidade total de Tweet por idioma e país
router.get('/information/lang', async (req, res, next) => {
  try {
    const latencia = histogram.startTimer()
    const createTweets = new CreateTweets('tweets');
    const result = await createTweets.countHashtagLang()
    res.status(200).send(result)
    counter.inc() // Quantidade de requisiçoes
    const seconds = latencia();
    histogram.labels(req.method, req.route.path, res.statusCode).observe(seconds)
  } catch (error) {
    const latencia = histogram.startTimer({ method: 'GET'});
    console.log(JSON.stringify({
      type: "error",
      app_name: process.env.APP_NAME, //varialvel de ambiente nao definida
      error: error.message,
      timestamp: Date.now() / 100,
    }))
    latencia( {code: '500'});
    res.status(500).send({
      error: "500 - Internal Server Error"
    });
  }
});

//Metricas para Prometheus
// Count de Requsicoes e Latencia
const cliente = require('prom-client');
const collectDefaultMetrics = cliente.collectDefaultMetrics;
// Probe every 5th second
collectDefaultMetrics({ timeout: 1000});

const counter = new cliente.Counter({
  name: 'node_request_operations_total',
  help: 'The total number of processes requests'
});

const histogram = new cliente.Histogram({
  name: 'node_request_duration_seconds',
  help: 'Histogram for the duration in seconds.',
  labelNames: ['method', 'route', 'code']
  //buckets: [1, 2, 5, 6, 10]
})

// Node direto no ElasticSearch
const Elasticsearch = require('elasticsearch');
const elasticClient = new Elasticsearch.Client({
  host: 'elasticsearch:9200',
  log: 'trace',
  apiVersion: '7.2', // use the same version of your Elasticsearch instance
});

//Home
router.get('/', async (req,res, next) => {

  //Valida conexao com ElasticSearch
  elasticClient.ping({
    // ping usually has a 3000ms timeout
    requestTimeout: 1000
  }, function (error) {
    if (error) {
      console.trace('elasticsearch cluster is down!');
    } else {
      console.log('All is well');
    }
  });
  

  elasticClient.index({
      index: 'loggings-bank-tweet-api',
      type: 'request',
      id: req.body.id,
      routing: req.method,
      body: {
        title: req.originalUrl,
        tags: ['home'],
        published: true,
        }

      });

  res.status(200).send( {
    mensagem: "Endpoint utilizado para Prometheus e Grafana",
    description: "Documentacao API - https://github.com/paulinhoart/bank-tweet"
});
 
});

//Metrics endpoint
router.get('/information/metrics', function (req, res) {
  res.set('Content-Type', cliente.register.contentType)
  res.end(cliente.register.metrics())
});


module.exports = router;
