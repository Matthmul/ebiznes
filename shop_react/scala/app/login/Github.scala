package login

import cats.implicits._
import com.ocadotechnology.sttp.oauth2.Secret
import io.circe.generic.auto._
import play.api.libs.json.{Json, OFormat}
import sttp.client3._
import sttp.client3.circe.asJson
import sttp.model.Header

trait Github {
  def userInfo(accessToken: Secret[String]): Option[UserInfo]
}

final case class UserInfo(
                           id: Int,
                           login: String,
                           avatar_url: String,
                           html_url: String,
                         )

object Github {
  implicit val userInfoFormat: OFormat[UserInfo] = Json.format[UserInfo]

  val baseUri = uri"https://api.github.com/"

  def instance(backend: SttpBackend[Identity, Any]): Github = (accessToken: Secret[String]) => {
    val header = Header("Accept", "application/vnd.github.v3+json")
    val header2 = Header("Authorization", s"token ${accessToken.value}")
    basicRequest
      .get(baseUri.withPath("user"))
      .headers(header, header2)
      .response(asJson[UserInfo])
      .send(backend)
      .map(_.body)
      .toOption
  }
}