package category.controllers

import category.models.{Category, NewCategory}
import javax.inject.Inject
import javax.inject.Singleton
import play.api.libs.json.{Json, OFormat}
import play.api.mvc.{AbstractController, Action, AnyContent, ControllerComponents}

import scala.collection.mutable

@Singleton
class CategoryController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {
  private val categoryList = new mutable.ListBuffer[Category]()

  categoryList += Category(1, "Zupy")
  categoryList += Category(2, "Dania")
  categoryList += Category(3, "Napoje")

  implicit val categoryListJson: OFormat[Category] = Json.format[Category]
  implicit val newCategoryListJson: OFormat[NewCategory] = Json.format[NewCategory]

  def getAll: Action[AnyContent] = Action {
    if (categoryList.isEmpty) NoContent else Ok(Json.toJson(categoryList))
  }

  def getById(itemId: Long): Action[AnyContent] = Action {
    val foundItem = categoryList.find(_.id == itemId)
    foundItem match {
      case Some(item) => Ok(Json.toJson(item))
      case None => NotFound
    }
  }

  def update(itemId: Long): Action[AnyContent] = Action { implicit request =>
    val content = request.body
    val jsonObject = content.asJson

    val foundItemIndex = categoryList.indexWhere(_.id == itemId)
    if (foundItemIndex == -1)
      BadRequest

    val productListItem: Option[NewCategory] = jsonObject.flatMap(Json.fromJson[NewCategory](_).asOpt)
    productListItem match {
      case Some(newItem) =>
        val toBeUpdated = Category(itemId, newItem.description)
        categoryList.updated(foundItemIndex, toBeUpdated)
        Accepted(Json.toJson(toBeUpdated))
      case None =>
        BadRequest
    }
  }

  def delete(itemId: Long): Action[AnyContent] = Action {
    categoryList.filterInPlace(_.id != itemId)
    Accepted
  }

  def add(): Action[AnyContent] = Action { implicit request =>
    val content = request.body
    val jsonObject = content.asJson

    val productListItem: Option[NewCategory] = jsonObject.flatMap(Json.fromJson[NewCategory](_).asOpt)
    productListItem match {
      case Some(newItem) =>
        val nextId = categoryList.map(_.id).max + 1
        val toBeAdded = Category(nextId, newItem.description)
        categoryList += toBeAdded
        Created(Json.toJson(toBeAdded))
      case None =>
        BadRequest
    }
  }
}
