package cart.controllers

import cart.models.{Cart, CartItem, NewCart}
import payment.controllers.PaymentController
import play.api.libs.json.{Json, OFormat}
import play.api.mvc.{AbstractController, Action, AnyContent, ControllerComponents}
import play.mvc.Http
import product.models.Product

import javax.inject.{Inject, Singleton}
import scala.collection.mutable

@Singleton
class CartController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {
  private val cartList = new mutable.ListBuffer[Cart]()

  cartList += Cart(1, 1, "", Array(CartItem(Product(1, "", 1, 1), 1)))

  implicit val productJson: OFormat[Product] = Json.format[Product]
  implicit val cartItemJson: OFormat[CartItem] = Json.format[CartItem]
  implicit val cartListJson: OFormat[Cart] = Json.format[Cart]
  implicit val newCartListJson: OFormat[NewCart] = Json.format[NewCart]

  def getAll: Action[AnyContent] = Action {
    if (cartList.isEmpty) NoContent else Ok(Json.toJson(cartList))
  }

  def getById(itemId: Long): Action[AnyContent] = Action {
    val foundItem = cartList.find(_.id == itemId)
    foundItem match {
      case Some(item) => Ok(Json.toJson(item))
      case None => NotFound
    }
  }

  def getByUser: Action[AnyContent] = Action { implicit request =>
    printf(request.session.toString)

    request.session
      .get("connected")
      .map { email =>
        val cartUserList = cartList.filter(_.email == email)
        if (cartUserList.isEmpty) NoContent else Ok(Json.toJson(cartUserList))
      }
      .getOrElse {
        Unauthorized("Oops, you are not connected")
      }
  }

  def update(itemId: Long): Action[AnyContent] = Action { implicit request =>
    val content = request.body
    val jsonObject = content.asJson

    val foundItemIndex = cartList.indexWhere(_.id == itemId)
    if (foundItemIndex == -1)
      BadRequest

    val productListItem: Option[NewCart] = jsonObject.flatMap(Json.fromJson[NewCart](_).asOpt)
    productListItem match {
      case Some(newItem) =>
        request.session
          .get("connected")
          .map { email =>
            val toBeUpdated = Cart(itemId, newItem.paymentId, email, newItem.items)
            cartList.updated(foundItemIndex, toBeUpdated)
            Accepted(Json.toJson(toBeUpdated))
          }
          .getOrElse {
            val toBeUpdated = Cart(itemId, newItem.paymentId, "", newItem.items)
            cartList.updated(foundItemIndex, toBeUpdated)
            Accepted(Json.toJson(toBeUpdated))
          }
      case None =>
        BadRequest
    }
  }

  def delete(itemId: Long): Action[AnyContent] = Action {
    cartList.filterInPlace(_.id != itemId)
    Accepted
  }

  def add(): Action[AnyContent] = Action { implicit request =>
    val content = request.body
    val jsonObject = content.asJson

    val productListItem: Option[NewCart] = jsonObject.flatMap(Json.fromJson[NewCart](_).asOpt)
    productListItem match {
      case Some(newItem) =>
        val nextId = cartList.map(_.id).max + 1
        printf(request.session.toString)
        request.session
          .get("connected")
          .map { email =>
            val toBeAdded = Cart(nextId, newItem.paymentId, email, newItem.items)
            cartList += toBeAdded
            Created(Json.toJson(toBeAdded))
          }
          .getOrElse {
            val toBeAdded = Cart(nextId, newItem.paymentId, "", newItem.items)
            cartList += toBeAdded
            Created(Json.toJson(toBeAdded))
          }
      case None =>
        BadRequest
    }
  }
}
