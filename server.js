/*

 * Criando server http e definindo porta

 */

const port = process.env.PORT || 3000;
const app = require('./app');

app.listen(port)
