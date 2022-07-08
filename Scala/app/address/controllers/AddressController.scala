package address.controllers

import address.models.{Address, NewAddress}
import play.api.Configuration
import play.api.libs.json.{Json, OFormat}
import play.api.mvc.{AbstractController, Action, AnyContent, ControllerComponents}

import javax.inject.{Inject, Singleton}
import scala.collection.mutable

@Singleton
class AddressController @Inject()(cc: ControllerComponents, configuration: Configuration) extends AbstractController(cc) {
  private val addressList = new mutable.ListBuffer[Address]()

  addressList += Address(1, "", 1, 1, "")

  implicit val addressListJson: OFormat[Address] = Json.format[Address]
  implicit val newAddressListJson: OFormat[NewAddress] = Json.format[NewAddress]

  def getAll: Action[AnyContent] = Action {
    if (addressList.isEmpty) NoContent else Ok(Json.toJson(addressList))
  }

  def getById(itemId: Long): Action[AnyContent] = Action {
    val foundItem = addressList.find(_.id == itemId)
    foundItem match {
      case Some(item) => Ok(Json.toJson(item))
      case None => NotFound
    }
  }

  def add(): Action[AnyContent] = Action { implicit request =>
    val content = request.body
    val jsonObject = content.asJson

    val productListItem: Option[NewAddress] = jsonObject.flatMap(Json.fromJson[NewAddress](_).asOpt)
    productListItem match {
      case Some(newItem) =>
        val nextId = addressList.map(_.id).max + 1
        val toBeAdded = Address(nextId, newItem.city, newItem.houseNumber.toInt, newItem.postalCode.toInt, newItem.street)
        addressList += toBeAdded
        Created(Json.toJson(toBeAdded))
      case None =>
        BadRequest
    }
  }

  def update(itemId: Long): Action[AnyContent] = Action { implicit request =>
    val content = request.body
    val jsonObject = content.asJson

    val foundItemIndex = addressList.indexWhere(_.id == itemId)
    if (foundItemIndex == -1)
      BadRequest

    val productListItem: Option[NewAddress] = jsonObject.flatMap(Json.fromJson[NewAddress](_).asOpt)
    productListItem match {
      case Some(newItem) =>
        val toBeUpdated = Address(itemId, newItem.city, newItem.houseNumber.toInt, newItem.postalCode.toInt, newItem.street)
        addressList.updated(foundItemIndex, toBeUpdated)
        Accepted(Json.toJson(toBeUpdated))
      case None =>
        BadRequest
    }
  }

  def delete(itemId: Long): Action[AnyContent] = Action {
    addressList.filterInPlace(_.id != itemId)
    Accepted
  }
}
