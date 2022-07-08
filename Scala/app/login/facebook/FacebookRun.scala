package login.facebook

import com.ocadotechnology.sttp.oauth2.AuthorizationCodeProvider.Config
import com.ocadotechnology.sttp.oauth2.AuthorizationCodeProvider.Config.{Path, Segment}
import com.ocadotechnology.sttp.oauth2.common.Scope
import com.ocadotechnology.sttp.oauth2.{AuthorizationCode, AuthorizationCodeProvider, OAuth2TokenResponse, Secret}
import io.circe.Decoder
import login.facebook.Facebook.checkPermissions
import play.api.Configuration
import play.api.libs.json.Json
import play.api.mvc.{AbstractController, Action, AnyContent, ControllerComponents}
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

object ConfigFacebook {
  val facebook: Config = Config(
    loginPath = Path(List(Segment("v14.0"), Segment("dialog"), Segment("oauth"))),
    logoutPath = Path(List(Segment("logout"))),
    tokenPath = Path(List(Segment("token")))
  )
}

@Singleton
class FacebookRun @Inject()(cc: ControllerComponents, configuration: Configuration) extends AbstractController(cc) {
  val backend: SttpBackend[Identity, Any] = HttpURLConnectionBackend()
  val facebook: Facebook = Facebook.instance(backend)
  val redirectUri: Uri = Uri.unsafeParse(s"${configuration.get[String]("facebook.redirectUri")}")
  val clientId: String = configuration.get[String]("facebook.clientId")
  val clientSecret: Secret[String] = Secret(configuration.get[String]("facebook.clientSecret"))
  val tokenUri: Uri = Uri.unsafeParse(s"https://graph.facebook.com/v14.0/oauth/access_token")
  val apiUri: String = configuration.get[String]("api.uri")
  val scopes: Set[Scope] = Set(Scope("email"))

  val authorizationCodeProvider: AuthorizationCodeProvider[Uri, Identity] = AuthorizationCodeProvider.uriInstance[Identity](
    baseUrl = Uri.unsafeParse("https://www.facebook.com/v14.0/dialog/oauth"),
    redirectUri = redirectUri,
    clientId = clientId,
    clientSecret = clientSecret,
    pathsConfig = ConfigFacebook.facebook)(backend)

  def facebookLogin(): Action[AnyContent] = Action {

    val uri = authorizationCodeProvider.loginLink(scope = scopes).addParam("auth_type", "rerequest")
    Accepted(Json.toJson(uri.toString()))
  }

  def authCodeToToken[TT <: OAuth2TokenResponse.Basic : Decoder](authCode: String): Identity[TT] =
    AuthorizationCode
      .authCodeToToken(tokenUri, redirectUri, clientId, clientSecret, authCode)(backend)

  def facebookCallback(code: String, state: String, error: String): Action[AnyContent] = Action {
    if (error == "access_denied") {
      Redirect(apiUri + "login")
    }
    else {
      val authCode = AuthorizationCodec(code)
      val token = authCodeToToken[FacebookTokenResponse](authCode.value)
      if (checkPermissions(backend, token.accessToken)) {
        val uri = authorizationCodeProvider.loginLink(scope = scopes).addParam("auth_type", "rerequest")
        Redirect(uri.toString())
      }
      else {
        val userInfo = facebook.userInfo(token.accessToken)
        val rg = userInfo.name.stripMargin('|').replaceAll("[^a-zA-Z0-9]", "").trim()

        val session  = login.controllers.SessionController.add(userInfo.email)
        Redirect(apiUri + "login?username=" + rg + "&token=" + session.token)
      }
    }
  }
}
