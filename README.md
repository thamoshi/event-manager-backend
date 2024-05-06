## Descrição

Aplicação backend em NestJs e Prisma para o sistema de eventos e locais.

## Rodando em docker

Certifique-se que tem docker e docker-compose instalado na sua máquina.

```bash
$ docker-compose up -d
```

O `docker-compose.yaml` irá rodar um container com a aplicação backend e um container com o banco de dados postgres.

Caso queira iniciar a aplicação com alguns dados já inseridos, substitua no dockerfile `CMD [ "npm", "run", "start:migrate:prod" ]` por `CMD [ "npm", "run", "start:migrate:seed:prod" ]`

## Inicialização local

1. Instalando as dependências

```bash
$ npm install
```

2. Altere o arquivo `.env` inserindo o seu valor de `_DATABASE_URL`

```
DATABASE_URL=`${_DATABASE_URL}`
```

3. Inicie o prisma e suas migrations

```
$ npx prisma generate
$ npx prisma migrate
```

4. Inicie a aplicação

```
$ npm run start
```
