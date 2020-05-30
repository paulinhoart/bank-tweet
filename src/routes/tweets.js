const express = require('express');
const router = express.Router();
var Twitter = require('twitter');


//autenticacao
var client = new Twitter ({
    consumer_key: 'KVWEDsKPWPKqdq9VDucJOaDzW',
    consumer_secret: 'Lv0dSQU4rqnlo2LqziREUOapoyZZll9M542qkudGvb25gFCSMI',
    access_token_key: '37733469-l9jPxHBwuAiiBcn7ReZqmPg3Mk8e2nQEF3W7vVuDX',
    access_token_secret: 'xJXP06NfHuzeios6VffCFxHXFLQFLmT8Zz5mgLpuDxR0c'
});

//Apresentacao
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
})


module.exports = router;



/*
  var params = {q: 'totvs', count: '100' };
  client.get('search/tweets', params, function(error, tweets, response) {
    if (!error) {
      console.log('Tweets encontrados', tweets);
      console.log(response);  // Raw response object.
    }
  });


var params = {q: 'totvs', count: '100' };
client.get('search/tweets', params, async function(error, tweets, response) {
   if (!error) {
      console.log('Tweets encontrados', tweets);
      console.log(response);  // Raw response object.
    }else throw error {
        console.log('Erro na consulta ', error);
    };
  });
*/
  

  