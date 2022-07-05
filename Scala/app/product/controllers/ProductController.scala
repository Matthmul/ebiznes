package product.controllers

import javax.inject.Inject
import javax.inject.Singleton
import play.api.libs.json.{Json, OFormat}
import play.api.mvc.{AbstractController, Action, AnyContent, ControllerComponents}
import product.models.{NewProduct, Product}

import scala.collection.mutable

@Singleton
class ProductController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {
  private val productList = new mutable.ListBuffer[Product]()

  productList += Product(1, "Chińska zupka", 10, 1)
  productList += Product(2, "Japońska zupka", 15, 1)
  productList += Product(3, "Kimchi", 25, 2)
  productList += Product(4, "Banchan", 30, 2)
  productList += Product(5, "Herbata jujuba", 30, 3)

  implicit val shopListJson: OFormat[Product] = Json.format[Product]
  implicit val newShopListJson: OFormat[NewProduct] = Json.format[NewProduct]

  def getAll: Action[AnyContent] = Action {
    if (productList.isEmpty) NoContent else Ok(Json.toJson(productList))
  }

  def getById(itemId: Long): Action[AnyContent] = Action {
    val foundItem = productList.find(_.id == itemId)
    foundItem match {
      case Some(item) => Ok(Json.toJson(item))
      case None => NotFound
    }
  }

  def getByCategory(itemId: Long): Action[AnyContent] = Action {
    val productCategoryList = productList.filter(_.category == itemId)
    if (productCategoryList.isEmpty) NotFound else Ok(Json.toJson(productCategoryList))
  }

  def update(itemId: Long): Action[AnyContent] = Action { implicit request =>
    val content = request.body
    val jsonObject = content.asJson

    val foundItemIndex = productList.indexWhere(_.id == itemId)
    if (foundItemIndex == -1)
      BadRequest

    val productListItem: Option[NewProduct] = jsonObject.flatMap(Json.fromJson[NewProduct](_).asOpt)
    productListItem match {
      case Some(newItem) =>
        val toBeUpdated = Product(itemId, newItem.description, newItem.price, newItem.category)
        productList.updated(foundItemIndex, toBeUpdated)
        Accepted(Json.toJson(toBeUpdated))
      case None =>
        BadRequest
    }
  }

  def delete(itemId: Long): Action[AnyContent] = Action {
    productList.filterInPlace(_.id != itemId)
    Accepted
  }

  def add(): Action[AnyContent] = Action { implicit request =>
    val content = request.body
    val jsonObject = content.asJson

    val productListItem: Option[NewProduct] = jsonObject.flatMap(Json.fromJson[NewProduct](_).asOpt)
    productListItem match {
      case Some(newItem) =>
        val nextId = productList.map(_.id).max + 1
        val toBeAdded = Product(nextId, newItem.description, newItem.price, newItem.category)
        productList += toBeAdded
        Created(Json.toJson(toBeAdded))
      case None =>
        BadRequest
    }
  }
}
