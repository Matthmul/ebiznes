package login.controllers

import login.models.Session
import play.api.libs.json.{Json, OFormat}

import javax.inject.Singleton
import scala.collection.mutable
import scala.util.Random

trait SessionController {
  def getAll: mutable.Seq[Session]

  def getByToken(token: String): Session

  def delete(token: String): Unit

  def add(email: String): Session
}

@Singleton
object SessionController {
  private val sessionList = new mutable.ListBuffer[Session]()

  sessionList += Session(1, "1234", "test@test.pl")

  implicit val sessionListJson: OFormat[Session] = Json.format[Session]

  def generateToken(): String = {
    Random.alphanumeric.take(25).mkString
  }

  def getAll: mutable.Seq[Session] = {
    sessionList
  }

  def getByToken(token: String): Session = {
    val foundItem = sessionList.find(_.token == token)
    foundItem match {
      case Some(item) => item
      case None => Session(-1, "", "")
    }
  }

  def delete(token: String): Unit = {
    sessionList.filterInPlace(_.token != token)
  }

  def add(email: String): Session = {
    val nextId = sessionList.map(_.id).max + 1
    val token = generateToken()
    val toBeAdded = Session(nextId, token, email)
    sessionList += toBeAdded
    toBeAdded
  }
}
