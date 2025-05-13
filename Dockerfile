ARG CODE_PATH=/usr/local/rec-sizing-ui

FROM alpine/git:2.47.2 AS repo

ARG CODE_PATH

WORKDIR $CODE_PATH
RUN git clone https://github.com/INESCTEC/rec-sizing-operation-gui.git

FROM node:slim AS build

ARG CODE_PATH

COPY --from=repo $CODE_PATH $CODE_PATH
WORKDIR $CODE_PATH/rec-sizing-operation-gui

RUN npm install
RUN npm run build
RUN mv ./WEB-INF ./dist

FROM tomcat:11 AS server

ARG CODE_PATH

RUN rm -rf /usr/local/tomcat/webapps/*
COPY --from=BUILD $CODE_PATH/rec-sizing-operation-gui/dist /usr/local/tomcat/webapps/ROOT

EXPOSE 8080
ENTRYPOINT ["catalina.sh", "run"]