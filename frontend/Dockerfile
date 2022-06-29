FROM node:17-slim

WORKDIR /

# Copy package.json and install packages
COPY package.json .

# ARG NODE_ENV
# RUN if [ "$NODE_ENV" = "development" ]; \
#         then npm install; \
#         else npm install --only=production; \
#         fi

RUN npm install

# Copy other project files and build
COPY . .

RUN npm run build

ENV PORT 5000
EXPOSE $PORT

CMD ["npm", "start"]
# CMD ["node", "server.js"]
