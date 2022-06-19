package login.facebook

import cats.implicits._
import com.ocadotechnology.sttp.oauth2.Secret
import io.circe.generic.auto._
import play.api.libs.json.{Json, OFormat}
import sttp.client3._
import sttp.client3.circe.asJson
import sttp.model.Header
import sttp.model.Uri.QuerySegment.KeyValue

trait Facebook {
  def userInfo(accessToken: Secret[String]): UserInfoWithMail
}

final case class UserInfoWithMail(
                                   name: String,
                                   id: String,
                                   email: String
                                 )

final case class PermissionInfo(
                                 data: Array[PermissionInfoElement]
                               )

final case class PermissionInfoElement(
                                        permission: String,
                                        status: String
                                      )

object Facebook {
  implicit val userInfoWithMailFormat: OFormat[UserInfoWithMail] = Json.format[UserInfoWithMail]

  val baseUri = uri"https://graph.facebook.com/v14.0/me"
  val header: Header = Header("Accept", "application/json")

  def instance(backend: SttpBackend[Identity, Any]): Facebook = (accessToken: Secret[String]) => {
    val user = basicRequest
      .get(baseUri.addQuerySegments(KeyValue("fields", "id,name,email"), KeyValue("access_token", accessToken.value)))
      .headers(header)
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

    UserInfoWithMail(user.name, user.id, user.email)
  }

  def checkPermissions(backend: SttpBackend[Identity, Any], accessToken: Secret[String]): Boolean = {
    val baseUriPerm = baseUri.addPath("permissions")

    val permission = basicRequest
      .get(baseUriPerm.addQuerySegment(KeyValue("access_token", accessToken.value)))
      .headers(header)
      .response(asJson[PermissionInfo])
      .send(backend)
      .map { response =>
        response.body match {
          case Right(t) => {
            t
          }
          case Left(e) => throw e
        }
      }
    permission.data.toList.foreach(element =>
      if (element.permission == "email" && element.status == "granted") return false else return true
    )
    true
  }
}