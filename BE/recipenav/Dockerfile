FROM adoptopenjdk/openjdk11
ARG JAR_FILE=build/libs/recipenav-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} recipenav.jar
ENTRYPOINT ["java","-jar","/recipenav.jar"]