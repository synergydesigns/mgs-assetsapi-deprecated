FROM node:latest

MAINTAINER Synergy Designs <<synergydesigns@gmail.com>>

COPY . /var/www
WORKDIR /var/www

CMD ["npm", "install"]
CMD ["npm", "run", "build"]

CMD ["node", "dist/server.js"]