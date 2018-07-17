FROM maven
WORKDIR /usr/src/dc2018-webAuth-docker

COPY . .

CMD ["./mvnw", "clean", "install", "wildfly:deploy"]
