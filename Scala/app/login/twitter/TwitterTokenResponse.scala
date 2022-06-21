package login.facebook

import com.ocadotechnology.sttp.oauth2.{OAuth2TokenResponse, Secret}
import io.circe.Decoder
import com.ocadotechnology.sttp.oauth2.circe._
import scala.concurrent.duration.FiniteDuration

case class FacebookTokenResponse(
                                  accessToken: Secret[String],
                                  tokenType: String,
                                  expiresIn: Option[FiniteDuration],
                                  auth_type: Option[String]
                                ) extends OAuth2TokenResponse.Basic

object FacebookTokenResponse {
  trait Basic {
    def accessToken: Secret[String]

    def tokenType: String
  }

  implicit val decoder: Decoder[FacebookTokenResponse] =
    Decoder.forProduct4(
      "access_token",
      "token_type",
      "expires_in",
      "auth_type"
    )(FacebookTokenResponse.apply)

}