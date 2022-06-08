package controllers

import javax.inject.Inject
import javax.inject.Singleton
import models.{NewShopItem, ShopItem}
import play.api.libs.json.{Json, OFormat}
import play.api.mvc.{AbstractController, Action, AnyContent, ControllerComponents}

import scala.collection.mutable

@Singleton
class ShopController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {
  private val shopList = new mutable.ListBuffer[ShopItem]()

  shopList += ShopItem(1, "Chinska Zupka", 10, inCart = false)

  implicit val shopListJson: OFormat[ShopItem] = Json.format[ShopItem]
  implicit val newShopListJson: OFormat[NewShopItem] = Json.format[NewShopItem]

  def getAll: Action[AnyContent] = Action {
    if (shopList.isEmpty) NoContent else Ok(Json.toJson(shopList))
  }

  def getById(itemId: Long): Action[AnyContent] = Action {
    val foundItem = shopList.find(_.id == itemId)
    foundItem match {
      case Some(item) => Ok(Json.toJson(item))
      case None => NotFound
    }
  }

  def update(itemId: Long): Action[AnyContent] = Action {
    val foundItemIndex = shopList.indexWhere(_.id == itemId)
    if (foundItemIndex == -1)
      NotFound
    val newItem = shopList(foundItemIndex).copy(inCart = true)
    shopList.updated(foundItemIndex, newItem)
    Accepted(Json.toJson(newItem))
  }

  def deleteAllDone(): Action[AnyContent] = Action {
    shopList.filterInPlace(_.inCart == true)
    Accepted
  }

  def delete(itemId: Long): Action[AnyContent] = Action {
    shopList.filterInPlace(_.id != itemId)
    Accepted
  }

  def add(): Action[AnyContent] = Action { implicit request =>
    val content = request.body
    val jsonObject = content.asJson

    val shopListItem: Option[NewShopItem] = jsonObject.flatMap(Json.fromJson[NewShopItem](_).asOpt)
    shopListItem match {
      case Some(newItem) =>
        val nextId = shopList.map(_.id).max + 1
        val toBeAdded = ShopItem(nextId, newItem.description, newItem.price, inCart = false)
        shopList += toBeAdded
        Created(Json.toJson(toBeAdded))
      case None =>
        BadRequest
    }
  }
}
