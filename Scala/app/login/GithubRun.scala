package login

import com.ocadotechnology.sttp.oauth2.{AuthorizationCodeProvider, OAuth2TokenResponse, Secret}
import play.api.libs.json.Json
import play.api.mvc.{AbstractController, Action, AnyContent, ControllerComponents, Cookie}
import sttp.client3.{SttpBackend, _}
import sttp.model.Uri
import sttp.tapir.CodecFormat.TextPlain
import sttp.tapir._

import javax.inject.{Inject, Singleton}

final case class AuthorizationCode(value: String) extends AnyVal

object AuthorizationCode {
  implicit val endpointCodec: Codec[String, AuthorizationCode, TextPlain] =
    Codec.string.map(AuthorizationCode(_))(_.value)
}

final case class State(value: String) extends AnyVal

object State {
  implicit val endpointCodec: Codec[String, State, TextPlain] =
    Codec.string.map(State(_))(_.value)
}

final case class Server(
                         host: String,
                         port: Int
                       )

@Singleton
class GithubRun @Inject()(cc: ControllerComponents) extends AbstractController(cc) {
  val backend: SttpBackend[Identity, Any] = HttpURLConnectionBackend()
  val github: Github = Github.instance(backend)
  val baseUri = uri"https://api.github.com/"

  val authorizationCodeProvider: AuthorizationCodeProvider[Uri, Identity] = AuthorizationCodeProvider.uriInstance[Identity](
    baseUrl = Uri.unsafeParse("https://github.com/"),
    redirectUri = Uri.unsafeParse(s"https://the-shop-backend.azurewebsites.net/github/callback"),
    clientId = "3c7f324665cb50d6c303",
    clientSecret = Secret("e0ce1ef9eb2d9d6af6d9c4b5067f5a90119ef3b5"),
    pathsConfig = AuthorizationCodeProvider.Config.GitHub)(backend)

  def githubLogin(): Action[AnyContent] = Action {
    val uri = authorizationCodeProvider.loginLink()
    Accepted(Json.toJson(uri.toString()))
  }

  def githubCallback(code: String, state: String): Action[AnyContent] = Action {
    val authCode = AuthorizationCode(code)
    val token = authorizationCodeProvider.authCodeToToken[OAuth2TokenResponse](authCode.value)
    val userInfo = github.userInfo(token.accessToken)
    userInfo match {
      case Some(newItem) =>
        Created(Json.toJson(newItem.toString))
          .withCookies(Cookie("username", newItem.login))
          .withNewSession
      case None =>
        BadRequest
    }
    Redirect("https://the-shop.azurewebsites.net/")
  }
}
