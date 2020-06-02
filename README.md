# Projeto Bank Tweet API
## Objetivo
Este projeto tem como objetivo desenvolver uma aplicação capaz de coletar postagens do Twitter conforme a #tag desejada.
### Principais Requisitos do projeto
   * Coletar ultimas 100 postagens de cada #tag informada. Não ultrapassar esta quantidade.
   * Salvar os dados coletados em banco de dados.
   * Disponiblizar Métricas, Logging.
### Requisito não funcionais
   * Arquitetura de ambiente em Docker

# Arquitetura da Aplicação
A aplicação é Web, todo seu ecossistema é em nuvem, rodando em Docker containers.
Para atender os requisitos do projeto vamos utilizar:
* Docker - nosso containers
* NodeJS - para desenvolvimento da API
* Prometheus - para metricas de infraestrutura, monitoramento
* Grafana - DashBoard para mostrar as metricas geradas pelo Prometheus
* Graylog ou ElastiSearch - para Logging da aplicação. Em definição

![](https://github.com/paulinhoart/bank-tweet/blob/master/Arquitetura.png)

# Documentação das APIs
Desenvolvemos 3 API,s para disponibilizar os requisitos:

| **Method**                    | **Finalidade**                                                                        |
|---------------------------|-----------------------------------------------------------------------------------|
| /api/information/topusers | Os cinco usuários que possuem mais seguidores                                     |
| /api/information/dia      | Total de postagens agrupadas por hora do dia                                      |
| /api/information/lang     | Total de postagens paara cada #TAG separado por idioma/país de origem da postagem |

### Consumo da APIs
Neste projeto inclui uma coleção que gerei do Postam, prontas para consumir as APIs.
* [Coleção Postam](https://github.com/paulinhoart/bank-tweet/blob/master/postman/APIs-Bank-Tweet.postman_collection.json)

# Documentação UP projeto em Docker
