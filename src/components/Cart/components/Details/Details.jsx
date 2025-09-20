import { useState } from "react";
import { useSnackbar } from "notistack";
import { useCart } from "../../../../hooks/useCart";

export const Details = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { totalPrice, cartItems, setCartItems, setOpenCart } = useCart();

  const [name, setName] = useState("");
  const [deliveryType, setDeliveryType] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const deliveryFee = deliveryType === "delivery" ? 20 : 0;
  const total = totalPrice + deliveryFee;

  const handlePay = (e) => {
    e.preventDefault();

    if (!name.trim())
      return enqueueSnackbar("Por favor ingresa un nombre.", {
        variant: "warning",
      });
    if (!deliveryType)
      return enqueueSnackbar("Selecciona un tipo de entrega.", {
        variant: "warning",
      });
    if (deliveryType === "delivery" && !address.trim())
      return enqueueSnackbar("Ingresa la dirección para el envío.", {
        variant: "warning",
      });
    if (!paymentMethod)
      return enqueueSnackbar("Selecciona un método de pago.", {
        variant: "warning",
      });

    const today = new Date();
    const formattedDate = today.toLocaleString("es-MX", {
      dateStyle: "short",
      timeStyle: "short",
    });

    let message = `*¡Nuevo pedido recibido!* \n\n`;
    message += `*Nombre:* ${name}\n`;
    message += `*Fecha:* ${formattedDate}\n`;
    message += `*Método de pago:* ${
      paymentMethod === "cash" ? "Efectivo" : "Transferencia"
    }\n`;
    message += `*Tipo de entrega:* ${
      deliveryType === "delivery"
        ? `Domicilio\n*Dirección:* ${address}`
        : "Recoger en el restaurante"
    }\n\n`;
    message += `*Productos:*\n`;
    cartItems.forEach((item, i) => {
      message += `${i + 1}. ${item.text} ${
        item.selectedSauce ? `(${item.selectedSauce})` : ""
      } x${item.qty} = $${item.price * item.qty}\n`;
    });
    message += `\n*Subtotal:* $${totalPrice}\n`;
    if (deliveryType === "delivery")
      message += `*Costo de entrega:* $${deliveryFee}\n`;
    message += `*Total a pagar:* $${total}\n\n`;

    const whatsappURL = `https://wa.me/528123697420?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappURL, "_blank");

    setCartItems([]);
    localStorage.removeItem("cart");
    setOpenCart(false);

    enqueueSnackbar("¡Orden lista para procesar! 🎉", { variant: "success" });
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 space-y-5">
      <h3 className="text-xl font-bold text-gray-800">Detalles de la Orden</h3>

      <div className="flex flex-col gap-2">
        <label className="font-medium text-gray-700">
          ¿Para quién es la orden?
        </label>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-700 rounded-lg py-2 px-3 outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-medium text-gray-700">Tipo de entrega</label>
        <div className="flex gap-4">
          {["pickup", "delivery"].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setDeliveryType(type)}
              className={`py-2 px-3 rounded-full border transition cursor-pointer ${
                deliveryType === type
                  ? "bg-primary border-amber-200 text-white"
                  : "bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {type === "pickup" ? "Pasar por él 🍴" : "Envío a domicilio 🚚"}
            </button>
          ))}
        </div>
      </div>

      {deliveryType === "delivery" && (
        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700">Dirección</label>
          <input
            type="text"
            placeholder="Calle, número, colonia..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-700 rounded-lg py-2 px-3 outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
          />
          <span className="text-xs italic">
            +${deliveryFee} pesos extra por entrega a domicilio
          </span>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label className="font-medium text-gray-700">Método de pago</label>
        <div className="flex gap-4">
          {["cash", "transfer"].map((method) => (
            <button
              key={method}
              type="button"
              onClick={() => setPaymentMethod(method)}
              className={`py-2 px-3 rounded-full border transition cursor-pointer ${
                paymentMethod === method
                  ? "bg-primary border-amber-200 text-white"
                  : "bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {method === "cash" ? "Efectivo 💵" : "Transferencia 🏦"}
            </button>
          ))}
        </div>
      </div>

      <hr className="text-gray-500/20" />

      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <span className="font-semibold">Subtotal</span>
          <span className="font-semibold">${totalPrice}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Entrega</span>
          <span className="font-semibold">${deliveryFee}</span>
        </div>

        <hr className="text-gray-500/20" />

        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">${total}</span>
        </div>

        <button
          type="button"
          onClick={handlePay}
          className="bg-black text-white text-center py-2 rounded-lg hover:bg-black/80 transition cursor-pointer"
        >
          Pagar
        </button>
      </div>
    </div>
  );
};
