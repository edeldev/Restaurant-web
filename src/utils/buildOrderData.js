export const buildOrderData = ({
  name,
  phone,
  cartItems,
  total,
  paymentMethod,
  deliveryType,
  address,
  formattedDate,
}) => {
  return {
    nombre: name,
    telefono: phone,
    pedido: cartItems
      .map(
        (item) =>
          `${item.text} ${
            item.selectedSauce ? `(${item.selectedSauce})` : ""
          } x${item.qty} = $${item.price * item.qty}`
      )
      .join("\n"),
    precio: total,
    metodoPago: paymentMethod === "cash" ? "Efectivo" : "Transferencia",
    tipoEntrega:
      deliveryType === "delivery" ? "Domicilio" : "Recoger en restaurante",
    direccion: deliveryType === "delivery" ? address : "",
    fecha: formattedDate,
  };
};
