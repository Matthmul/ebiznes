package logout

import play.api.Configuration
import play.api.libs.json.Json
import play.api.mvc._
import sttp.model.Uri

import javax.inject.{Inject, Singleton}

@Singleton
class Logout @Inject()(cc: ControllerComponents, configuration: Configuration) extends AbstractController(cc) {
  val apiUri: String = configuration.get[String]("api.uri")

  def logoutController: Action[AnyContent] = Action { request =>
    val baseUri =
      if(request.secure)
        Uri.unsafeParse("https://" + request.host + "/logoutCallback")
      else
        Uri.unsafeParse("http://" + request.host + "/logoutCallback")
    Accepted(Json.toJson(baseUri.toString()))
  }

  def logoutCallback: Action[AnyContent] = Action {
    Redirect(apiUri)
      .discardingCookies(
        DiscardingCookie("username"),
        DiscardingCookie("email"))
      .withNewSession
      .withHeaders("Location" -> apiUri)
  }
}