/*

    * Autor: Paulo Roberto 
    * Data: 30/05/2020

   * Criando server http e definindo porta

 */

const port = process.env.PORT || 3100;
const app = require('./app');

app.listen(port)
