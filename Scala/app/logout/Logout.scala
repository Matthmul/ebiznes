package logout

import play.api.libs.json.Json
import play.api.mvc._

import javax.inject.{Inject, Singleton}

@Singleton
class Logout @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  def logoutController: Action[AnyContent] = Action {
      Ok(Json.toJson("")).discardingCookies(
        DiscardingCookie("PLAY_SESSION"),
        DiscardingCookie("username"),
        DiscardingCookie("email"))
        .withNewSession
  }
}