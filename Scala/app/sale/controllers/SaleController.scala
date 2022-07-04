package sale.controllers

import sale.models.{Sale, NewSale}
import play.api.libs.json.{Json, OFormat}
import play.api.mvc.{AbstractController, Action, AnyContent, ControllerComponents}
import product.models.Product

import javax.inject.{Inject, Singleton}
import scala.collection.mutable

@Singleton
class SaleController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {
  private val saleList = new mutable.ListBuffer[Sale]()

  saleList += Sale(1, 1, 1.0)

  implicit val productJson: OFormat[Product] = Json.format[Product]
  implicit val saleListJson: OFormat[Sale] = Json.format[Sale]
  implicit val newSaleListJson: OFormat[NewSale] = Json.format[NewSale]

  def getAll: Action[AnyContent] = Action {
    if (saleList.isEmpty) NoContent else Ok(Json.toJson(saleList))
  }

  def getById(itemId: Long): Action[AnyContent] = Action {
    val foundItem = saleList.find(_.id == itemId)
    foundItem match {
      case Some(item) => Ok(Json.toJson(item))
      case None => NotFound
    }
  }

  def update(itemId: Long): Action[AnyContent] = Action { implicit request =>
    val content = request.body
    val jsonObject = content.asJson

    val foundItemIndex = saleList.indexWhere(_.id == itemId)
    if (foundItemIndex == -1)
      BadRequest

    val productListItem: Option[NewSale] = jsonObject.flatMap(Json.fromJson[NewSale](_).asOpt)
    productListItem match {
      case Some(newItem) =>
        val toBeUpdated = Sale(itemId, newItem.itemId, newItem.discount)
        saleList.updated(foundItemIndex, toBeUpdated)
        Accepted(Json.toJson(toBeUpdated))
      case None =>
        BadRequest
    }
  }

  def delete(itemId: Long): Action[AnyContent] = Action {
    saleList.filterInPlace(_.id != itemId)
    Accepted
  }

  def add(): Action[AnyContent] = Action { implicit request =>
    val content = request.body
    val jsonObject = content.asJson

    val productListItem: Option[NewSale] = jsonObject.flatMap(Json.fromJson[NewSale](_).asOpt)
    productListItem match {
      case Some(newItem) =>
        val nextId = saleList.map(_.id).max + 1
        val toBeAdded = Sale(nextId, newItem.itemId, newItem.discount)
        saleList += toBeAdded
        Created(Json.toJson(toBeAdded))
      case None =>
        BadRequest
    }
  }
}
