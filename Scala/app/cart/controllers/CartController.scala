package cart.controllers

import cart.models.{Cart, CartItem, NewCart}
import play.api.libs.json.{Json, OFormat}
import play.api.mvc.{AbstractController, Action, AnyContent, ControllerComponents}
import product.models.Product

import javax.inject.{Inject, Singleton}
import scala.collection.mutable

@Singleton
class CartController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {
  private val cartList = new mutable.ListBuffer[Cart]()

  cartList += Cart(1, 1, 1, "", Array(CartItem(Product(1, "", 1, 1), 1)))

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

  def getByUser(token: String = null): Action[AnyContent] = Action { implicit request =>
    if (token == null) {
      Unauthorized
    }
    else {
      val session = login.controllers.SessionController.getByToken(token)
      if (session.id == -1) {
        NoContent
      } else {
        val cartUserList = cartList.filter(_.email == session.email)
        if (cartUserList.isEmpty) NoContent else Ok(Json.toJson(cartUserList))
      }
    }
  }

  def update(itemId: Long, token: String = null): Action[AnyContent] = Action { implicit request =>
    val content = request.body
    val jsonObject = content.asJson

    val foundItemIndex = cartList.indexWhere(_.id == itemId)
    if (foundItemIndex == -1)
      BadRequest

    val productListItem: Option[NewCart] = jsonObject.flatMap(Json.fromJson[NewCart](_).asOpt)
    productListItem match {
      case Some(newItem) =>
        if (token == null) {
          val toBeUpdated = Cart(itemId, newItem.paymentId, newItem.addressId, "", newItem.items)
          cartList.updated(foundItemIndex, toBeUpdated)
          Accepted(Json.toJson(toBeUpdated))
        } else {
          val session = login.controllers.SessionController.getByToken(token)
          if (session.id == -1) {
            Unauthorized
          } else {
            val toBeUpdated = Cart(itemId, newItem.paymentId, newItem.addressId, session.email, newItem.items)
            cartList.updated(foundItemIndex, toBeUpdated)
            Accepted(Json.toJson(toBeUpdated))
          }
        }
      case None =>
        BadRequest
    }
  }

  def delete(itemId: Long): Action[AnyContent] = Action {
    cartList.filterInPlace(_.id != itemId)
    Accepted
  }

  def add(token: String = null): Action[AnyContent] = Action { implicit request =>
    val content = request.body
    val jsonObject = content.asJson

    val productListItem: Option[NewCart] = jsonObject.flatMap(Json.fromJson[NewCart](_).asOpt)
    productListItem match {
      case Some(newItem) =>
        val nextId = cartList.map(_.id).max + 1
        if (token == null) {
          val toBeAdded = Cart(nextId, newItem.paymentId, newItem.addressId, "", newItem.items)
          cartList += toBeAdded
          Created(Json.toJson(toBeAdded))
        }
        else {
          val session = login.controllers.SessionController.getByToken(token)
          val toBeAdded = Cart(nextId, newItem.paymentId, newItem.addressId, session.email, newItem.items)
          cartList += toBeAdded
          Created(Json.toJson(toBeAdded))
        }
      case None =>
        BadRequest
    }
  }
}
