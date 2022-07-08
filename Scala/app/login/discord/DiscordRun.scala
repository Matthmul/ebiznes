package login.discord

import cats.implicits._
import com.ocadotechnology.sttp.oauth2.AuthorizationCodeProvider.Config
import com.ocadotechnology.sttp.oauth2.AuthorizationCodeProvider.Config.{Path, Segment}
import com.ocadotechnology.sttp.oauth2.common.Scope
import com.ocadotechnology.sttp.oauth2.{AuthorizationCodeProvider, Secret}
import play.api.Configuration
import play.api.libs.json.Json
import play.api.mvc.{AbstractController, Action, AnyContent, ControllerComponents}
import sttp.client3.circe.asJson
import sttp.client3.{SttpBackend, _}
import sttp.model.{Header, HeaderNames, Uri}
import sttp.tapir.CodecFormat.TextPlain
import sttp.tapir._

import javax.inject.{Inject, Singleton}

final case class AuthorizationCodec(value: String) extends AnyVal

object AuthorizationCodec {
  implicit val endpointCodec: Codec[String, AuthorizationCodec, TextPlain] =
    Codec.string.map(AuthorizationCodec(_))(_.value)
}

object ConfigDiscord {
  val instagram: Config = Config(
    loginPath = Path(List(Segment("api"), Segment("oauth2"), Segment("authorize"))),
    logoutPath = Path(List(Segment("api"), Segment("oauth2"), Segment("token"), Segment("revoke"))),
    tokenPath = Path(List(Segment("api"), Segment("oauth2"), Segment("token")))
  )
}

@Singleton
class DiscordRun @Inject()(cc: ControllerComponents, configuration: Configuration) extends AbstractController(cc) {
  val backend: SttpBackend[Identity, Any] = HttpURLConnectionBackend()
  val discord: Discord = Discord.instance(backend)
  val redirectUri: Uri = Uri.unsafeParse(s"${configuration.get[String]("discord.redirectUri")}")
  val clientId: String = configuration.get[String]("discord.clientId")
  val clientSecret: Secret[String] = Secret(configuration.get[String]("discord.clientSecret"))
  val tokenUri: Uri = Uri.unsafeParse(s"https://discord.com/api/oauth2/token")
  val apiUri: String = configuration.get[String]("api.uri")
  val scopes: Set[Scope] = Set(Scope("identify"), Scope("email"))

  val authorizationCodeProvider: AuthorizationCodeProvider[Uri, Identity] = AuthorizationCodeProvider.uriInstance[Identity](
    baseUrl = Uri.unsafeParse("https://discord.com/api/oauth2/authorize"),
    redirectUri = redirectUri,
    clientId = clientId,
    clientSecret = clientSecret,
    pathsConfig = ConfigDiscord.instagram)(backend)

  def discordLogin(): Action[AnyContent] = Action {

    val uri = authorizationCodeProvider.loginLink(scope = scopes)
    Accepted(Json.toJson(uri.toString()))
  }

  private def tokenRequestParams(authCode: String,
                                 redirectUri: String,
                                 clientId: String,
                                 clientSecret: Secret[String]) =
    Map(
      "code" -> authCode,
      "grant_type" -> "client_credentials",
      "client_id" -> clientId,
      "client_secret" -> clientSecret.value,
      "redirect_uri" -> redirectUri,
      "scope" -> "identify email",
    )

  def discordCallback(code: String, state: String, error: String): Action[AnyContent] = Action {
    if (error == "access_denied") {
      Redirect(apiUri + "login")
    }
    else {
      val authCode = AuthorizationCodec(code)
      val token = backend
        .send {
          basicRequest
            .post(tokenUri)
            .headers(
              Header(HeaderNames.ContentType, "application/x-www-form-urlencoded;charset=UTF-8"))
            .body(tokenRequestParams(authCode.value, redirectUri.toString(), clientId, clientSecret))
            .response(asJson[DiscordTokenResponse])
        }
        .map { response =>
          response.body match {
            case Right(t) => {
              t
            }
            case Left(e) => throw e
          }
        }
      val userInfo = discord.userInfo(token.accessToken)

      val session  = login.controllers.SessionController.add(userInfo.email)
      Redirect(apiUri + "login?username=" + userInfo.username + "&token=" + session.token)
    }
  }
}
