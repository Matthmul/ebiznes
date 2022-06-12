package payment.models

case class Payment(id: Long, number: String, name: String, expiry: String, cvc: String)
