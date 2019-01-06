FROM node:carbon-alpine

COPY ./entrypoint.sh /entrypoint/

RUN ["chmod", "+x", "entrypoint/entrypoint.sh"]

# Copy or mount node app here
WORKDIR /data/

ENTRYPOINT ["/entrypoint/entrypoint.sh"]

CMD ["npm", "start"]