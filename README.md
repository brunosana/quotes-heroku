# Quotes Backend

> Esse repositório contém o backend da aplicação Quotes, disponível [Clicando aqui](https://bernardocamps.github.io/quotes/)

## Tecnologias utilizadas

1. NodeJS com Typescript para desenvolvimento
2. PostgreSQL para o banco de dados
3. Heroku para o deploy
4. ESlint e Prettier para formatação de código
5. Yarn como gerenciador de pacotes


### Para usar o ESLint

1. Instalar a extensão ESLint no VSCode
2. Abrir as configurações em _File->preferences->settings_ e no canto superior direito clicar em _Open Settings JSON_
3. Inserir o trecho:
```JSON
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
}
```
4. Reinicie o VSCode e estará pronto.

**Para outros editores, por favor consulte a sua respectiva documentação.**

## Executando o projeto

### Banco de dados


1. Com docker

Para instalar o container do postgresql com os dados corretamente, utilize a seguinte linha de comando:
```
docker run --name quotes -e POSTGRES_USER=quotes_admin -e POSTGRES_PASSWORD=quotes_application -p 5432:5432 -d postgres
```

2. Para outros formados de banco de dados, basta seguir a documentação criando um banco `quotes` com usuario e password a sua escolha.
3. Na pasta raiz do projeto, criar um arquivo `.env` contendo:
```
PORT=3333
TYPEORM_CONNECTION = postgres
TYPEORM_HOST = localhost
TYPEORM_PORT = 5432
TYPEORM_USERNAME = usuario_postgres_criado
TYPEORM_PASSWORD = senha_postgres_criada
TYPEORM_DATABASE = quotes
TYPEORM_ENTITIES = src/models/*.ts
TYPEORM_ENTITIES_DIR = src/models/
TYPEORM_MIGRATIONS = src/database/migrations/*.ts
TYPEORM_MIGRATIONS_DIR = src/database/migrations
TYPEORM_SYNCHRONIZE = true
```


### Instalando as dependências

1. No terminal da pasta, inserir `yarn` para instalar as dependências.
2. Executar a aplicação com `yarn dev:server`
