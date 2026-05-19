# Usamos una versión ligera de Node.js
FROM node:18-alpine

# Creamos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos de dependencias
COPY package*.json ./

# Instalamos las librerías
RUN npm install

# Copiamos el resto del código
COPY . .

# Exponemos el puerto de nuestro servidor
EXPOSE 4000

# Comando para ejecutar la app usando nodemon para que se actualice sola
CMD ["npx", "nodemon", "server.js"]