FROM maven
WORKDIR /usr/src/dc2018-webAuth-docker
COPY . .
RUN ["mvn", "clean", "install"]
CMD ["mvn", "spring-boot:run"]

