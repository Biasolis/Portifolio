# Estágio 1: Base com Node.js 18-alpine (leve)
FROM node:18-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia o package.json e package-lock.json primeiro
# Isso aproveita o cache do Docker. Só reinstala se o package.json mudar.
COPY package*.json ./

# Instala as dependências de produção
RUN npm install --omit=dev

# Copia o resto do código da aplicação
COPY . .

# Expõe a porta que o server.js usa
EXPOSE 3001

# Comando para rodar a aplicação (usando o script de 'start')
CMD [ "npm", "start" ]