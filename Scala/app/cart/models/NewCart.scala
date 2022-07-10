package cart.models

case class NewCart(paymentId: Long, addressId: Long, items: Array[CartItem])