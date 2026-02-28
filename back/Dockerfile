FROM node:20
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN chmod +x start.sh
ENTRYPOINT ["sh", "start.sh"]
CMD [""]