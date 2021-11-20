# Specify base image
FROM node:alpine

WORKDIR /usr/app

# Install some dependencies
COPY ./package.json ./
RUN npm install

# Copy directory
COPY ./ ./

# Default command
CMD [ "npm", "start" ]