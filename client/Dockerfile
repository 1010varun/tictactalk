FROM node:18-alpine

WORKDIR /tic-tac-talk/

COPY . /tic-tac-talk/

RUN npm install

EXPOSE 5173

CMD ["npm", "run", "dev"]