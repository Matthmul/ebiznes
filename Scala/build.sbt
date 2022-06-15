name := """shop"""
organization := "com.shops"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.13.6"

libraryDependencies ++= Seq(
  guice,
  "org.scalatestplus.play" %% "scalatestplus-play" % "5.0.0" % Test,
  "com.typesafe.play" %% "play" % "2.7.3",
  "com.ocadotechnology" %% "sttp-oauth2" % "0.14.0",
  "io.circe" %% "circe-generic" % "0.14.1",
  "com.softwaremill.sttp.tapir" %% "tapir-core" % "0.18.0-M15",
  "com.softwaremill.sttp.tapir" %% "tapir-http4s-server" % "0.18.0-M15",
  "com.softwaremill.sttp.client3" %% "async-http-client-backend-cats-ce2" % "3.3.6",
  "com.typesafe.akka" %% "akka-actor-typed" % "2.6.8",
  "com.typesafe.akka" %% "akka-stream" % "2.6.8",
)
