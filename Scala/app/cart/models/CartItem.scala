package cart.models

import product.models.Product

case class CartItem(item: Product, quantity: Int)
