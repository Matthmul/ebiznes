package cart.models

case class Cart(id: Long, paymentId: Long, email: String, items: Array[CartItem])
