FROM gradle:7.6-jdk17 AS build

WORKDIR /app

COPY . .
RUN ./gradlew build --no-daemon -x test

FROM openjdk:17-slim

WORKDIR /app

COPY --from=build /app/app/build/libs/app-all.jar app.jar

ENV KAFKA_BROKER_ADDR=broker:29092
ENV KAFKA_TOPIC=cdc-changes

ENTRYPOINT ["java", "-jar", "app.jar"]