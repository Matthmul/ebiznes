package login

import cats.implicits._
import com.ocadotechnology.sttp.oauth2.Secret
import io.circe.generic.auto._
import play.api.libs.json.{Json, OFormat}
import sttp.client3._
import sttp.client3.circe.asJson
import sttp.model.Header

trait Github {
  def userInfo(accessToken: Secret[String]): UserInfoWithMail
}

final case class UserInfo(
                           id: Int,
                           login: String
                         )

final case class Mail(
                       email: String
                     )

final case class UserInfoWithMail(
                                   id: Int,
                                   login: String,
                                   email: String
                                 )

object Github {
  implicit val userInfoFormat: OFormat[UserInfo] = Json.format[UserInfo]
  implicit val mailFormat: OFormat[Mail] = Json.format[Mail]
  implicit val userInfoWithMailFormat: OFormat[UserInfoWithMail] = Json.format[UserInfoWithMail]

  val baseUri = uri"https://api.github.com/"

  def instance(backend: SttpBackend[Identity, Any]): Github = (accessToken: Secret[String]) => {
    val header = Header("Accept", "application/vnd.github.v3+json")
    val header2 = Header("Authorization", s"token ${accessToken.value}")
    val user = basicRequest
      .get(baseUri.withPath("user"))
      .headers(header, header2)
      .response(asJson[UserInfo])
      .send(backend)
      .map { response =>
        response.body match {
          case Right(t) => {
            t
          }
          case Left(e) => throw e
        }
      }

    val mail = basicRequest
      .get(baseUri.withPath("user", "emails"))
      .headers(header, header2)
      .response(asJson[Array[Mail]])
      .send(backend)
      .map { response =>
        response.body match {
          case Right(t) => {
            t
          }
          case Left(e) => throw e
        }
      }

    UserInfoWithMail(user.id, user.login, mail.head.email)
  }
}