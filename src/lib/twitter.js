var Twitter = require('twitter');

//autenticacao
var client = new Twitter ({
    consumer_key: 'KVWEDsKPWPKqdq9VDucJOaDzW',
    consumer_secret: 'Lv0dSQU4rqnlo2LqziREUOapoyZZll9M542qkudGvb25gFCSMI',
    access_token_key: '37733469-l9jPxHBwuAiiBcn7ReZqmPg3Mk8e2nQEF3W7vVuDX',
    access_token_secret: 'xJXP06NfHuzeios6VffCFxHXFLQFLmT8Zz5mgLpuDxR0c'
});

//example busca tweet na timeline
//var params = {screen_name: 'totvs', count: '3' };
//client.get('statuses/user_timeline', params, function(error, tweets, response) {
//  if (!error) {
//    console.log(tweets); 
//  }
//});
/*
client.get('favorites/list', params, function(error, tweets, response) {
    if(error) throw error;
        console.log(tweets);  // The favorites.
     //   console.log(response);  // Raw response object.
  }); */

  var params = {q: 'totvs', count: '100' };
  client.get('search/tweets', params, function(error, tweets, response) {
    if (!error) {
      console.log('Tweets encontrados', tweets);
    }
  });

  