const mongosso = require('mongoose');

mongoose.connect('mongodb://localhost:27017/tweetdbprod', { useMongoClient: true });
mongoose.Promise = global.Promise;

//model
const tweets = new mongoose.Schema({
    user: {
        type: String,
    },
    date: { 
        type: String,
    },
    timestamp: {
        type: Number,
    },
    tweet_text: { 
        type: String,
    },
    hashTag: { 
        type: String,
    },
    followers: { 
        type: Number,
    },
    language: { 
        type: String,
    },
    location: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = { mongoose , tweet }