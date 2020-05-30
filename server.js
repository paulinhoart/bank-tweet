/*
Criando server http e definindo porta
*/
const port = process.env.PORT || 3000;
const app = require('./app');
//const server = http.createServer(app); //cria o server com base no aap.js

app.listen(port)

//server.listen(port);