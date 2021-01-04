FROM node:10

# ------------
# Install Gdal
# ------------

RUN apt-get update && apt-get install -y git gdal-bin


# ----------------------------------------
# Clone Napkin-Globe repo
# ----------------------------------------

WORKDIR /usr/local/app/

RUN git clone https://github.com/NapkinGIS/Napkin-Globe.git

WORKDIR /usr/local/app/Napkin-Globe

RUN rm README.md LICENCE .gitignore
RUN rm -rf deploy/ .git/

RUN npm install && npm run gulp release

EXPOSE 3001


# --------------------
# Run within container
# --------------------

CMD [ "node", "./node_modules/terriajs-server/lib/app.js", "--config-file", "devserverconfig.json" ]
