FROM node:22

ARG NODE_ENV

WORKDIR /app

EXPOSE 3000

CMD npm install; \
npx -y playwright install --with-deps; \
tail -f /dev/null
