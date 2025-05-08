FROM node:20

WORKDIR /app

COPY package*.json ./

# Install all dependencies (including devDependencies)
RUN npm install --include=dev

# Install TypeScript, ts-node, and nodemon globally
RUN npm install -g typescript ts-node nodemon

COPY . .

# Compile TypeScript
RUN tsc

EXPOSE 5000

CMD ["nodemon", "src/server.ts"]
