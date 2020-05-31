/*

   * Autor: Paulo Roberto 
   * Data: 31/05/2020

   * Entidade tweets com todos registros coletados.
   * Executar POS apenas uma vez parada dados nao se repetirem, necessario 
   * melhoria, pois impacta na query Top 5 Usuarios

*/


const data = require('./db');

class createTweet {
  constructor(Collection) {
    this.collection = Collection;
  }
  
  //Item 3 do case - Armazenar na base de dados as #tags
  gravaRegsitro(user, date, timestamp, text, tag, followers, lang, location) {
    try {
      delete data.Mongoose.connection.models['tweets'];
      const Registro = data.Mongoose.model(this.collection, data.SaveTweet, this.collection); 
      const newregistro = new Registro({
        User: user,
        Date: date,
        Timestamp: timestamp,
        Tweet_text: text,
        HashTag: tag,
        Followers: followers,
        Language: lang,
        Location: location
      });
      return newregistro.save();
    } catch (error) {
      return Promise.reject(error)
    }
  }
  

  // Top 5 usuarios conforme amostra, que possuem mais seguidores
  topFiveUsersFollows() {
    try {
      delete data.Mongoose.connection.models['tweets'];
      const usersfollows = data.Mongoose.model(this.collection, data.SaveTweet);
      //console.log('result', usersfollows.find().sort({ Followers: -1 }).limit(5).exec())
      return usersfollows.find().sort({ Followers: -1 }).limit(5).exec();
    } 
    catch (error) {
      return Promise.reject(error)
    }
  }
  
  // Retornar Quantidade de Tweet Dia
  totalTweetDia() {
    try {
      delete data.Mongoose.connection.models['tweets'];
      const sumarie = data.Mongoose.model(this.collection, data.CountTweetDay);
      return sumarie.aggregate().addFields({ convertedDate: { $toDate: "$Timestamp" } }).group({ _id: { $dateToString: { format: "%Y-%m-%d-H:%H:00:00", date: { $toDate: "$convertedDate" } } }, tweets: { $sum: 1 } }).sort({ "convertedDate": 1 }).exec();
    } catch (error) {
      return Promise.reject(error)
    }
  }

  
// Retornar total por #tag
  countHashtagLang() {
    try {
      delete data.Mongoose.connection.models['tweets'];
      const comment = data.Mongoose.model(this.collection, data.CountTweetDay);
      return comment.aggregate().group({ _id: { hasjtag: "$HashTag", language: "$Language", location: "$Location" }, tweets: { $sum: 1 } }).sort({ "tweets": -1 }).exec();
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

module.exports = createTweet;
