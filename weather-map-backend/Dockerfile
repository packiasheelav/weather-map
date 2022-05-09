FROM node:14-alpine AS builder

ENV NODE_ENV production yarn install

RUN mkdir -p /home/node/app

# Add a work directory
WORKDIR /home/node/app

# Cache and Install dependencies
COPY package.json ./
COPY yarn.lock ./

RUN yarn install

# Copy app files
COPY . .

# Build
CMD yarn build

FROM node:14-alpine AS production

# Copy built assets/bundle from the builder
COPY --from=builder /home/node/app/dist .
COPY --from=builder /home/node/app/data ./data

EXPOSE 3001

# Start the app
CMD node app.js