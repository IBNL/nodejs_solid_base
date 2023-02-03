#imagem com a versao que sera utilizada
FROM node:18

#diretorio onde as informacoes serao armazenadas ao criar o container
WORKDIR /usr/src/app

#copiar package.json para o workdir
COPY package.json ./

RUN npm install

#copiar tudo do projeto para o workdir
COPY . .

#abrir porta 8080
EXPOSE 8080

#
CMD ["npm", "run", "dev"]

