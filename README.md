# Projeto Bank Tweet API
### Objetivo
Este projeto tem como objetivo desenvolver uma aplicação capaz de coletar postagens do Twitter conforme a #tag desejada.
#### Principais Requisitos do projeto
   * Coletar ultimas 100 postagens de cada #tag informada. Não ultrapassar esta quantidade.
   * Salvar os dados coletados em banco de dados.
   * Disponiblizar Métricas, Logging.
#### Requisito não funcionais
   * Arquitetura de ambiente em Docker
   * Chaves de acesso para consumir as APIs do Twitter

## Arquitetura da Aplicação
A aplicação é Web, todo seu ecossistema é em nuvem, rodando em Docker containers.
Para atender os requisitos do projeto vamos utilizar:
* Docker - nosso containers
* NodeJS - para desenvolvimento da API
* Prometheus - para metricas de infraestrutura, monitoramento
* Grafana - DashBoard para mostrar as metricas geradas pelo Prometheus
* ElastiSearch - para Logging da aplicação.
* Kibana para Dash do ElasticSearch

![](https://github.com/paulinhoart/bank-tweet/blob/master/imagens/Arquitetura.png)

Compartilhei o diagrama, utilizei Draw io - [Diagrama](https://drive.google.com/file/d/1Vq6Pd3Js1Mhk7pO05eyGwV0hITg2YPZZ/view?usp=sharing) 

## Documentação da API
Desenvolvemos a API para atender os requisitos do projeto:

| **Endpoint**                    | **Finalidade**                                                                        |
|---------------------------|-----------------------------------------------------------------------------------|
| /api/information/topusers | Os cinco usuários que possuem mais seguidores                                     |
| /api/information/dia      | Total de postagens agrupadas por hora do dia                                      |
| /api/information/lang     | Total de postagens paara cada #TAG separado por idioma/país de origem da postagem |

### Consumo da API
Neste projeto inclui uma coleção que gerei do Postam, prontas para consumir as APIs.
* [Coleção Postman](https://github.com/paulinhoart/bank-tweet/blob/master/postman/APIs-Bank-Tweet.postman_collection.json)

## Deploy da Aplicação
### Requisitos
Antes de realizar o deploy da aplicação Bank Tweet API, verificar os requisitos abaixo
#### Credencias Twitter API
Para consumir as APIs do Twitter é necessário obter as chaves de acesso.
Acesse - https://developer.twitter.com/en
Com as credencias em mãos, como boa prática você pode definir as chaves em variaveis de ambiente para segurança e não definir em fontes, este projeto contém as chaves apenas como exemplo.
```
var client = new Twitter ({
    consumer_key: ' ',
    consumer_secret: ' ',
    access_token_key: ' ',
    access_token_secret: ' '
});
```
#### Ambientes Docker
A aplicação Web foi desenvolvida com a pratica de utilização de containers, e utilizaremos o Docker Compose.
Para este trabalho utilizamos o Docker na versão:

```
% docker -v
Docker version 19.03.8, build afacb8b
```
#### Portas
Certifique que as portas abaixos não estão em uso:
* **3100**  - NodeJS utiliza para expor as APIs
* **27017** - MongoDB
* **9090**  - Prometheus
* **3000**  - Grafana
* **9200**  - ElasticSearch
* **5601**  - Kibana

### Subindo a Aplicação
Com os requisitos acima finalizados, vamos subir a aplicação.
1. Primeiro clonar o projeto para local

2. Acessar a raiz da pasta do projeto e executar:
```
% docker-compose up -d
```
Resultado
```
Creating bank-tweet-api       ... done
Creating prometheus           ... done
Creating mongodb              ... done
Creating bank-tweet_grafana_1 ... done
```
Caso tudo done, pronto sua aplicação esta no ar.

Através do Postman, importe a coleção [APIs-Bank-Tweet...json](https://github.com/paulinhoart/bank-tweet/blob/master/postman/APIs-Bank-Tweet.postman_collection.json) que esta na pasta postman e execute o method POST para popular a base de dados.

Em seguida pode acessar os endpoint, Grafana, Prometheus pelo navegador:
* http://localhost:3100 - API com endpoints conforme informações em Documentação da API
* http://localhost:3000 - Grafana DashBoard
* http://localhost:9090 - Prometheus

# Métricas - DashBoard e Logs
## Loggings (item 7)
O NodeJs envia logs para o ElasticSearch e utilizamos o Kibana.

![](https://github.com/paulinhoart/bank-tweet/blob/master/imagens/elasticsearch%2Bkibana.png)

## Grafana DashBoard (item 9)
Com a coleta de métricas realizadas através do Prometheus com NodeJs, conseguimos disponibilizar as informações 
em DashBoard, utilizamos o Grafana para expor as informações de:

* Consumo de Memória da Aplicação
* Quantidade de Requisições nas APIs
* Latencia - Tempo de execução de cada método
* Total geral de erros das APIs

![](https://github.com/paulinhoart/bank-tweet/blob/master/grafana/Grafana.png)

## Referências
Para este projeto, consultei referencias, documentações de fabricantes e comunidades sobre as ferramentas.
* Twitter - https://developer.twitter.com/en/docs/api-reference-index
* NodeJs - https://nodejs.org/en/docs/
* Prometheus - https://prometheus.io/docs/prometheus/latest/getting_started/
* Grafana - https://grafana.com/docs/grafana/latest/
* Docker - https://docs.docker.com/compose/
* ElasticSearch - https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/16.x/index.html e https://www.npmjs.com/package/elasticsearch


## Considerações
O trabalho pode ser realizado de diversas formas, mas o que é preciso, em minha opnião, é procurar as melhores praticas, seja no desenvolvimento, processos e empatia, todos estes itens podemos e devemos melhorar a cada dia pois a pratica e a repetição nos direciona  ao amadurecimento, experiência e melhores resultados.

Obrigado pelo oportunidade deste desafio, onde estudei e aprendi muito.

.
