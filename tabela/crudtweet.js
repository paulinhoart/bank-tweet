const data = require('../database/db');

class createTweet {
    constructor(Collection) {
        this.collection = Collection;
    }

    addRegistro(user, date, timestamp, text, tag, followers, lang, location) {
        try {
          delete db.Mongoose.connection.models['tweets'];
          delete db.Mongoose.connection.models['tweets']
          const Registro = db.Mongoose.model(this.collection, db.SaveTweet, this.collection);
          const newregistro = new Registro({
            user: user,
            date: date,
            timestamp: timestamp,
            tweet_text: text,
            hashTag: tag,
            followers: followers,
            language: lang,
            location: location
          });
          return newregistro.save();
        } catch (error) {
          return Promise.reject(error)
        }
      }
    
}

module.exports = createTweet;