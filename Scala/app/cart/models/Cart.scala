package cart.models

case class Cart(id: Long, paymentId: Long, addressId: Long, email: String, items: Array[CartItem])
