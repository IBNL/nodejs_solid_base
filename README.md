- Criar containers do projeto com docker.
    - No diretório principal do projeto
```
$ docker build -t nome-build .
```
- Subir os containers que foram criados
```
$ docker-compose up -d
```

- Criar base de teste manualmente(add um shellscript para evitar fazer manualmente)
```
create database database_psql_test;
```

- Criar tabelas do projeto com as migrations
```
$ npm run typeorm:run migration:run
```
- Rodar os testes para verificar se está tudo OK
```
$ npm run test 
```

- Documentação dos endpoints
```
http://localhost:8080/api-docs/
```