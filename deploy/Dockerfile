FROM node:10

# ------------
# Install Gdal
# ------------

RUN apt-get update && apt-get install -y wget unzip gdal-bin


# ----------------------------------------
# Clone Napkin-Globe repo
# ----------------------------------------

WORKDIR /usr/local/app/

RUN wget https://github.com/NapkinGIS/Napkin-Globe/releases/download/v1.0/globe.zip

RUN unzip globe.zip

WORKDIR /usr/local/app/globe


# --------------------
# Run within container
# --------------------

EXPOSE 3001

CMD [ "node", "./node_modules/terriajs-server/lib/app.js", "--config-file", "devserverconfig.json" ]
