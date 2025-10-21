# Estágio 1: Build (usando Node)
FROM node:18-alpine AS build

WORKDIR /app

# Copia os arquivos de definição do projeto
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o resto do código do frontend
COPY . .

# Roda o script de "build" do Vite
RUN npm run build

# Estágio 2: Serve (usando Nginx)
FROM nginx:1.25-alpine

# Copia os arquivos estáticos compilados do Estágio 1 (da pasta /app/dist)
# para a pasta padrão do Nginx que serve HTML
COPY --from=build /app/dist /usr/share/nginx/html

# (Opcional) Copia uma config customizada do Nginx se precisar de roteamento
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80 (padrão do Nginx)
EXPOSE 80

# O Nginx inicia automaticamente
CMD ["nginx", "-g", "daemon off;"]