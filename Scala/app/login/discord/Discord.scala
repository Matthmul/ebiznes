package login.discord

import cats.implicits._
import com.ocadotechnology.sttp.oauth2.Secret
import io.circe.generic.auto._
import play.api.libs.json.{Json, OFormat}
import sttp.client3._
import sttp.client3.circe.asJson
import sttp.model.{Header, HeaderNames}

trait Discord {
  def userInfo(accessToken: Secret[String]): UserInfoWithMail
}

final case class UserInfoWithMail(
                                   id: String,
                                   username: String,
                                   email: String,
                                 )

object Discord {
  implicit val userInfoWithMailFormat: OFormat[UserInfoWithMail] = Json.format[UserInfoWithMail]

  val baseUri = uri"https://discord.com/api/v6/users/@me"
  val header: Header = Header(HeaderNames.Accept, "application/json")

  def instance(backend: SttpBackend[Identity, Any]): Discord = (accessToken: Secret[String]) => {
    val header2: Header = Header(HeaderNames.Authorization, "Bearer " + accessToken.value)

    val user = basicRequest
      .get(baseUri)
      .headers(header, header2)
      .response(asJson[UserInfoWithMail])
      .send(backend)
      .map { response =>
        response.body match {
          case Right(t) => {
            t
          }
          case Left(e) => throw e
        }
      }

    UserInfoWithMail(user.id, user.username, user.email)
  }
}