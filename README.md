<div align="center">
  <h1>🎓 Studier API 🎓</h1>
</div>

Node.JS API using Typescript, Express and Prisma

### Escolha sua lingua / Choose your language

- [pt-BR](#pt-br)
- [en](#en)

-----
<a id="pt-br"></a>
## Documetação pt-BR 🇧🇷 

### Studier - Estude compartilhando com todos!

## Tabela de conteúdos

- [Como rodar o projeto](#how-to-run-br)
- [A ideia do projeto](#ideas-br)
- [Endpoints da API](#endpoints-br)

<a id="how-to-run-br"></a>
## Como rodar o projeto

### Sem o docker

- [ ] Tenha um banco de dados em postgres rodando

Clone o repositório:
```
git clone https://github.com/abnerpersio/studier-api.git
```

Acesse a pasta do projeto:
```
cd studier-api
```

Duplique o arquivo `.env.production` e altere o seu nome para `.env`

Altere as informações do arquivo `.env` de acordo com suas necessidades (as configurações do banco de dados estão em "DATABASE_URL")

Rode o comando para executar as migrations no banco POSTGRES:
```
npm run db:migrate
```

Usando yarn:
```
yarn db:migrate
```

### Com o docker

Rode o projeto todo usando docker-compose:
```
docker-compose up
```

Acesse o terminal do container usando o comando docker exec:
```
docker exec -it studier_api bash
```

Rode o comando dentro do container para executar as migrations no banco POSTGRES usando o prisma:
```
npm run db:migrate
```

A API Studier estará funcionando e pronta para ser testada na porta `8080` (padrão)

🚀 Aproveite para testar a API! 🚀

<a id="endpoints-br"></a>
## Endpoints da API

Os endpoints estão configurados e documentados em uma collection do INSOMNIA e o arquivo `.json` está disponível [neste link](https://gist.github.com/abnerpersio/593f50448769778f415038f04b1263a4)

Baixe o arquivo, importe no insomnia e teste a API :)

-----

<a id="en"></a>
## English documentation 🇺🇸

### Studier - Study sharing with everyone!

## Table of contents

- [How to run the project](#how-to-run-en)
- [The project ideia](#how-to-run-en)
- [API endpoints](#how-to-run-en)


<a id="#how-to-run-en"></a>
## How to run the project

### Without docker

- [ ] Have a postgres database running

Clone the github repository:
```
git clone https://github.com/abnerpersio/studier-api.git
```

Access the project folder:
```
cd studier-api
```

Copy `.env.production` file and change its name to `.env`

Change the informations inside `.env` file according your needs (the database configuration is inside "DATABASE_URL")

Run the commando to execute the migrations with prisma in your POSTGRES database
```
npm run db:migrate
```

Using yarn:
```
yarn db:migrate
```

### With docker

Run the project using docker-compose:
```
docker-compose up
```

Access the container terminal using docker exec command
```
docker exec -it studier_api bash
```

Run this command inside the container to execute them migrations with prisma in your POSTGRES database
```
npm run db:migrate
```

The Studier API is working and ready to be tested in port `8080` (default)

🚀 Enjoy to test the API! 🚀


<a id="endpoints-en"></a>
## API endpoints

The endpoints are configured and documented in a INSOMNIA collection and the `.json` file is available in [this link](https://gist.github.com/abnerpersio/593f50448769778f415038f04b1263a4)

Download the file, import in insomnia and test the API :)
