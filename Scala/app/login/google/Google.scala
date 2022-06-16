package login.google

import cats.implicits._
import com.ocadotechnology.sttp.oauth2.Secret
import io.circe.generic.auto._
import play.api.libs.json.{Json, OFormat}
import sttp.client3._
import sttp.client3.circe.asJson
import sttp.model.Uri.QuerySegment.KeyValue

trait Google {
  def userInfo(accessToken: Secret[String]): UserInfoWithMail
}

final case class UserInfoWithMail(
                                   sub: String,
                                   given_name: String,
                                   email: String
                                 )

object Google {
  implicit val userInfoWithMailFormat: OFormat[UserInfoWithMail] = Json.format[UserInfoWithMail]

  val baseUri = uri"https://www.googleapis.com/oauth2/v3/userinfo"

  def instance(backend: SttpBackend[Identity, Any]): Google = (accessToken: Secret[String]) => {
    val user = basicRequest
      .get(baseUri.addQuerySegment(KeyValue("access_token", accessToken.value)))
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

    UserInfoWithMail(user.sub, user.given_name, user.email)
  }
}