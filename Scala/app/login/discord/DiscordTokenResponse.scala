package login.discord

import com.ocadotechnology.sttp.oauth2.circe._
import com.ocadotechnology.sttp.oauth2.{OAuth2TokenResponse, Secret}
import io.circe.Decoder

import scala.concurrent.duration.FiniteDuration

case class DiscordTokenResponse(
                                  accessToken: Secret[String],
                                  expiresIn: Option[FiniteDuration],
                                  scope: String,
                                  tokenType: String,
                                ) extends OAuth2TokenResponse.Basic

object DiscordTokenResponse {
  trait Basic {
    def accessToken: Secret[String]

    def tokenType: String
  }

  implicit val decoder: Decoder[DiscordTokenResponse] =
    Decoder.forProduct4(
      "access_token",
      "expires_in",
      "scope",
      "token_type"
    )(DiscordTokenResponse.apply)

}