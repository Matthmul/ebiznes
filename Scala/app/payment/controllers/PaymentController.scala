package payment.controllers

import payment.models.{NewPayment, Payment}
import javax.inject.Inject
import javax.inject.Singleton
import play.api.libs.json.{Json, OFormat}
import play.api.mvc.{AbstractController, Action, AnyContent, ControllerComponents}

import scala.collection.mutable

@Singleton
class PaymentController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {
  private val paymentList = new mutable.ListBuffer[Payment]()

  paymentList += Payment(1, "0000 0000 0000 0000", "A A", "00/00", "000")

  implicit val categoryListJson: OFormat[Payment] = Json.format[Payment]
  implicit val newCategoryListJson: OFormat[NewPayment] = Json.format[NewPayment]

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

  def update(itemId: Long): Action[AnyContent] = Action { implicit request =>
    val content = request.body
    val jsonObject = content.asJson

    val foundItemIndex = paymentList.indexWhere(_.id == itemId)
    if (foundItemIndex == -1)
      BadRequest

    val productListItem: Option[NewPayment] = jsonObject.flatMap(Json.fromJson[NewPayment](_).asOpt)
    productListItem match {
      case Some(newItem) =>
        val toBeUpdated = Payment(itemId, newItem.number, newItem.name, newItem.expiry, newItem.cvc)
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

  def add(): Action[AnyContent] = Action { implicit request =>
    val content = request.body
    val jsonObject = content.asJson

    val productListItem: Option[NewPayment] = jsonObject.flatMap(Json.fromJson[NewPayment](_).asOpt)
    productListItem match {
      case Some(newItem) =>
        val nextId = paymentList.map(_.id).max + 1
        val toBeAdded = Payment(nextId, newItem.number, newItem.name, newItem.expiry, newItem.cvc)
        paymentList += toBeAdded
        Created(Json.toJson(toBeAdded))
      case None =>
        BadRequest
    }
  }
}
