package payment.controllers

import cats.implicits.toFunctorOps
import payment.models.{NewPayment, Payment}
import play.api.Configuration
import play.api.libs.json.{Json, OFormat}
import play.api.mvc.{AbstractController, Action, AnyContent, ControllerComponents}
import sttp.client3.{HttpURLConnectionBackend, Identity, SttpBackend, UriContext, basicRequest}
import sttp.model.{Header, HeaderNames}

import javax.inject.{Inject, Singleton}
import scala.collection.mutable

@Singleton
class PaymentController @Inject()(cc: ControllerComponents, configuration: Configuration) extends AbstractController(cc) {
  private val paymentList = new mutable.ListBuffer[Payment]()
  val clientSecret: String = configuration.get[String]("stripe.clientSecret")
  val backend: SttpBackend[Identity, Any] = HttpURLConnectionBackend()
  val baseUri = uri"https://api.stripe.com/v1/payment_intents"

  paymentList += Payment(1, 10, "")

  implicit val paymentListJson: OFormat[Payment] = Json.format[Payment]
  implicit val newCardListJson: OFormat[NewPayment] = Json.format[NewPayment]

  def getAll: Action[AnyContent] = Action {
    if (paymentList.isEmpty) NoContent else Ok(Json.toJson(paymentList))
  }

  def getById(itemId: Long): Action[AnyContent] = Action {
    val foundItem = paymentList.find(_.id == itemId)
    foundItem match {
      case Some(item) => Ok(Json.toJson(item))
      case None => NotFound
    }
  }

  def add(): Action[AnyContent] = Action { implicit request =>
    val content = request.body
    val jsonObject = content.asJson

    val productListItem: Option[NewPayment] = jsonObject.flatMap(Json.fromJson[NewPayment](_).asOpt)
    productListItem match {
      case Some(newItem) =>
        val chargeParams = Map(
          "amount" -> newItem.value.toString,
          "currency" -> "pln",
          "payment_method" -> newItem.creditCardTokenId,
          "confirm" -> "true"
        )

        backend
          .send {
            basicRequest
              .post(baseUri)
              .headers(
                Header(HeaderNames.ContentType, "application/x-www-form-urlencoded"),
                Header(HeaderNames.Authorization, "Bearer " + clientSecret))
              .body(chargeParams)
          }
          .map { response =>
            response.body match {
              case Right(t) => {
                val js = Json.parse(t)
                if (js("amount_received").toString() == newItem.value.toString) {
                  val nextId = paymentList.map(_.id).max + 1
                  val toBeAdded = Payment(nextId, newItem.value, js("id").toString())
                  paymentList += toBeAdded
                  Created(Json.toJson(toBeAdded))
                }
                else {
                  PaymentRequired
                }
              }
              case Left(e) => BadRequest(e)
            }
          }
      case None =>
        BadRequest
    }
  }

  def update(itemId: Long): Action[AnyContent] = Action { implicit request =>
    val content = request.body
    val jsonObject = content.asJson

    val foundItemIndex = paymentList.indexWhere(_.id == itemId)
    if (foundItemIndex == -1)
      BadRequest

    val productListItem: Option[NewPayment] = jsonObject.flatMap(Json.fromJson[NewPayment](_).asOpt)
    productListItem match {
      case Some(newItem) =>
        val toBeUpdated = Payment(itemId, newItem.value, paymentList(foundItemIndex).paymentId)
        paymentList.updated(foundItemIndex, toBeUpdated)
        Accepted(Json.toJson(toBeUpdated))
      case None =>
        BadRequest
    }
  }

  def delete(itemId: Long): Action[AnyContent] = Action {
    paymentList.filterInPlace(_.id != itemId)
    Accepted
  }
}
