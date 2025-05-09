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

EXPOSE 8080

# Run migrations before starting the server
CMD ["sh", "-c", "npx db-migrate up && nodemon src/server.ts"]
