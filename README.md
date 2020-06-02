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

# Deploy do Projeto
## Requisitos
Antes de realizar o deploy, verificar os requisitos abaixo
### Ambientes Docker
A aplicação Web foi desenvolvida com a pratica de utilização de containers, e utilizamores o Docker.
Para este trabalho utilizamos o Docker na versão:

```
% docker -v
Docker version 19.03.8, build afacb8b
```
### Portas
Certifique que as portas abaixos não estão em uso:
* **3100**  - NodeJS utiliza para expor as APIs
* **27017** - MongoDB
* **9090**  - Prometheus
* **3000**  - Grafana

### Subindo Aplicação
Com os requisitos acima finalizados

# Métricas - DashBoard e Logs
## Grafana DashBoard
Com a coleta de métricas realizadas através do Prometheus com NodeJs, conseguimos disponibilizar as informações 
em DashBoard, utilizamos o Grafana para expor as informações de:

* Consumo de Memória da Aplicação
* Quantidade de Requisições nas APIs
* Latencia - Tempo de execução de cada método
* Total geral de erros das APIs

![](https://github.com/paulinhoart/bank-tweet/blob/master/grafana/Grafana.png)

# Referências


# Considerações
O trabalho pode ser realizado de diversas formas, mas o que é preciso, em minha opnião, é procurar as melhores praticas, seja no desenvolvimento, processos e empatia, todos estes itens podemos e devemos melhorar a cada dia pois a pratica e a repetição nos direciona  ao amadurecimento, experiência e melhores resultados.

Obrigado pelo oportunidade deste desafio, onde estudei e aprendi muito.

.
