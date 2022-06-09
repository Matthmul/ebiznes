package card.controllers

import card.models.{Card, NewCard}

import javax.inject.Inject
import javax.inject.Singleton
import play.api.libs.json.{Json, OFormat}
import play.api.mvc.{AbstractController, Action, AnyContent, ControllerComponents}

import scala.collection.mutable

@Singleton
class CardController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {
  private val cardList = new mutable.ListBuffer[Card]()

  cardList += Card(1, "Chinska Zupka", 10, 1)

  implicit val cardListJson: OFormat[Card] = Json.format[Card]
  implicit val newCardListJson: OFormat[NewCard] = Json.format[NewCard]

  def getAll: Action[AnyContent] = Action {
    if (cardList.isEmpty) NoContent else Ok(Json.toJson(cardList))
  }

  def getById(itemId: Long): Action[AnyContent] = Action {
    val foundItem = cardList.find(_.id == itemId)
    foundItem match {
      case Some(item) => Ok(Json.toJson(item))
      case None => NotFound
    }
  }

  def update(itemId: Long): Action[AnyContent] = Action { implicit request =>
    val content = request.body
    val jsonObject = content.asJson

    val foundItemIndex = cardList.indexWhere(_.id == itemId)
    if (foundItemIndex == -1)
      BadRequest

    val productListItem: Option[NewCard] = jsonObject.flatMap(Json.fromJson[NewCard](_).asOpt)
    productListItem match {
      case Some(newItem) =>
        val toBeUpdated = Card(itemId, newItem.description, newItem.price, newItem.quantity)
        cardList.updated(foundItemIndex, toBeUpdated)
        Accepted(Json.toJson(toBeUpdated))
      case None =>
        BadRequest
    }
  }

  def delete(itemId: Long): Action[AnyContent] = Action {
    cardList.filterInPlace(_.id != itemId)
    Accepted
  }

  def add(): Action[AnyContent] = Action { implicit request =>
    val content = request.body
    val jsonObject = content.asJson

    val productListItem: Option[NewCard] = jsonObject.flatMap(Json.fromJson[NewCard](_).asOpt)
    productListItem match {
      case Some(newItem) =>
        val nextId = cardList.map(_.id).max + 1
        val toBeAdded = Card(nextId, newItem.description, newItem.price, newItem.quantity)
        cardList += toBeAdded
        Created(Json.toJson(toBeAdded))
      case None =>
        BadRequest
    }
  }
}
