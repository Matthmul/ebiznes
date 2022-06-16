package login.google

import com.ocadotechnology.sttp.oauth2.AuthorizationCodeProvider.Config
import com.ocadotechnology.sttp.oauth2.AuthorizationCodeProvider.Config.{Path, Segment}
import com.ocadotechnology.sttp.oauth2.common.Scope
import com.ocadotechnology.sttp.oauth2.{AuthorizationCode, AuthorizationCodeProvider, OAuth2TokenResponse, Secret}
import io.circe.Decoder
import play.api.Configuration
import play.api.libs.json.Json
import play.api.mvc.{AbstractController, Action, AnyContent, ControllerComponents, Cookie}
import sttp.client3.{SttpBackend, _}
import sttp.model.Uri
import sttp.tapir.CodecFormat.TextPlain
import sttp.tapir._

import javax.inject.{Inject, Singleton}

final case class AuthorizationCodec(value: String) extends AnyVal

object AuthorizationCodec {
  implicit val endpointCodec: Codec[String, AuthorizationCodec, TextPlain] =
    Codec.string.map(AuthorizationCodec(_))(_.value)
}

object ConfigGoogle {
  val google: Config = Config(
    loginPath = Path(List(Segment("o"), Segment("oauth2"), Segment("v2"), Segment("auth"))),
    logoutPath = Path(List(Segment("logout"))),
    tokenPath = Path(List(Segment("token")))
  )
}

@Singleton
class GoogleRun @Inject()(cc: ControllerComponents, configuration: Configuration) extends AbstractController(cc) {
  val backend: SttpBackend[Identity, Any] = HttpURLConnectionBackend()
  val google: Google = Google.instance(backend)
  val redirectUri: Uri = Uri.unsafeParse(s"${configuration.get[String]("google.redirectUri")}")
  val clientId: String = configuration.get[String]("google.clientId")
  val clientSecret: Secret[String] = Secret(configuration.get[String]("google.clientSecret"))
  val tokenUri: Uri = Uri.unsafeParse(s"https://oauth2.googleapis.com/token")
  val apiUri: String = configuration.get[String]("api.uri")

  val authorizationCodeProvider: AuthorizationCodeProvider[Uri, Identity] = AuthorizationCodeProvider.uriInstance[Identity](
    baseUrl = Uri.unsafeParse("https://accounts.google.com/o/oauth2/v2/auth"),
    redirectUri = redirectUri,
    clientId = clientId,
    clientSecret = clientSecret,
    pathsConfig = ConfigGoogle.google)(backend)

  def googleLogin(): Action[AnyContent] = Action {
    val scopes = Set(
      Scope("https://www.googleapis.com/auth/userinfo.email"),
      Scope("https://www.googleapis.com/auth/userinfo.profile"))
    val uri = authorizationCodeProvider.loginLink(scope = scopes)
    Accepted(Json.toJson(uri.toString()))
  }

  def authCodeToToken[TT <: OAuth2TokenResponse.Basic : Decoder](authCode: String): Identity[TT] =
    AuthorizationCode
      .authCodeToToken(tokenUri, redirectUri, clientId, clientSecret, authCode)(backend)

  def googleCallback(code: String, state: String): Action[AnyContent] = Action {
    val authCode = AuthorizationCodec(code)
    val token = authCodeToToken[OAuth2TokenResponse](authCode.value)
    val userInfo = google.userInfo(token.accessToken)
    val rg = userInfo.given_name.stripMargin('|').replaceAll("[^a-zA-Z0-9]", " ").trim()

    Redirect(apiUri)
      .withCookies(Cookie("username", rg))
      .withCookies(Cookie("email", userInfo.email))
      .withSession("id" -> userInfo.sub)
  }
}
