FROM node:16-alpine as dev

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install --save-dev

COPY . .

RUN npm run start

###

# FROM node:16-alpine as prod

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm install --production

# COPY . .

# COPY --from=dev /usr/src/app/dist ./dist

# CMD ["node", "dist/main"]