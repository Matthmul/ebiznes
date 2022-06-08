ARG UBUNTU_TAG=20.04
FROM ubuntu:${UBUNTU_TAG}

LABEL maintainer="Maciej Mularski <maciej.mularski@student.uj.edu.pl>"

ENV SCALA_VERSION 2.13.6
ENV SCALA_TARBALL http://www.scala-lang.org/files/archive/scala-$SCALA_VERSION.deb  
ENV SCALA_HOME /usr/local

ENV SBT_VERSION 1.6.2
ENV SBT_TARBALL https://repo.scala-sbt.org/scalasbt/debian/sbt-$SBT_VERSION.deb

RUN \
    apt-get update -y && \
    apt-get upgrade -y && \
    apt install default-jdk -y

RUN \
    apt-get install -y libjansi-java && \  
    apt-get install -y curl && \
    curl -sSL $SCALA_TARBALL -o scala.deb && \  
    dpkg -i scala.deb

RUN \
    curl -L -o sbt-$SBT_VERSION.deb $SBT_TARBALL && \
    dpkg -i sbt-$SBT_VERSION.deb && \
    rm sbt-$SBT_VERSION.deb && \
    apt-get update && \
    apt-get install sbt

RUN \
    rm -f *.deb && \  
    apt-get clean && \  
    rm -rf /var/lib/apt/lists/*

WORKDIR /project

RUN \
    echo 'name := "project"' > /project/build.sbt && \
    echo 'version := "1.0"' >> /project/build.sbt && \
    echo "scalaVersion := \"$SCALA_VERSION\"" >> /project/build.sbt

VOLUME [ "/project/shared" ]

EXPOSE 8000

CMD ["/bin/bash"]