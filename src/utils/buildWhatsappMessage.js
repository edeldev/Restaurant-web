export const buildWhatsappMessage = ({
  name,
  phone,
  formattedDate,
  orderData,
  cartItems,
  totalPrice,
  deliveryType,
  address,
  total,
}) => {
  let message = `*¡Nuevo pedido!* \n\n`;
  message += `*Nombre:* ${name}\n`;
  message += `*Teléfono:* ${phone}\n`;
  message += `*Fecha:* ${formattedDate}\n`;
  message += `*Método de pago:* ${orderData.metodoPago}\n`;
  message += `*Tipo de entrega:* ${orderData.tipoEntrega}\n`;

  if (deliveryType === "delivery") {
    message += `*Dirección:* ${address}\n`;
  }

  message += `\n*Productos:*\n`;
  cartItems.forEach((item, i) => {
    message += `${i + 1}. ${item.text} ${
      item.selectedSauce ? `(${item.selectedSauce})` : ""
    } x${item.qty} = $${item.price * item.qty}\n`;
  });

  message += `\n*Subtotal:* $${totalPrice}\n`;
  if (deliveryType === "delivery") message += `*Costo de entrega:* $20\n`;
  message += `*Total a pagar:* $${total}\n\n`;

  return message;
};
