# pull official base image
FROM node:14.17.3
LABEL name="rosdesigner" \
  maintainer="Gachi" \
  version=0.0.1

# set working directory
WORKDIR /rostelecom2

# add `/app/node_modules/.bin` to $PATH
ENV PATH /rostelecom2/node_modules/.bin:$PATH

RUN npm install -g npm@7.6.0

RUN npm install --force -g yarn@1.22.10




# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn --silent

# add app
COPY . ./

CMD [ "yarn", "start" ]

EXPOSE 80
