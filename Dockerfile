FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# Install both the main dependencies and the typography plugin
RUN npm install --legacy-peer-deps && \
    npm install -D @tailwindcss/typography

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
