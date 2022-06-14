package cart.models

case class Cart(id: Long, paymentId: Int, items: Array[CartItem])
