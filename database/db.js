const mongoose = require('mongoose');

// Config Docker Network
mongoose.connect('mongodb://mongo:27017/tweetdbprod', { useNewUrlParser: true  });
// Config 
//mongoose.connect('mongodb://localhost:27017/tweetdbprod', { useNewUrlParser: true  });
//mongoose.Promise = global.Promise;


//model  tweets
const tweets = new mongoose.Schema({
    user: String,
    date: String,
    timestamp: Number,
    tweet_text: String,
    hashTag: String,
    followers: Number,
    language: String,
    location: String
    });


const saveTweet = new mongoose.Schema({
    User: String,
    Date: String,
    Timestamp: Number,
    Tweet_text: String,
    HashTag: String,
    Followers: Number,
    Language: String,
    Location: String
});

// total de tweet dia
const countTweetDay = new mongoose.Schema({
  _id: String,
  tweets: String
});

// total #tag
const countHashtagLang = new mongoose.Schema({
	"_id" : Object,
	tweets : Number
});

module.exports = { Mongoose: mongoose, Tweets: tweets, SaveTweet: saveTweet, CountTweetDay: countTweetDay, CountHashtagLang: countHashtagLang }

/*
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('onectado');
});

var kittySchema = new mongoose.Schema({
    name: String
  });

var Kitten = mongoose.model('Kitten', kittySchema);
var small = new Kitten({name: 'Paul'});
small.save( function (err) {
    if (!err) console.log('salvou');
}) */