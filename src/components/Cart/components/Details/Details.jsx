import { useState } from "react";
import { useSnackbar } from "notistack";
import { useCart } from "../../../../hooks/useCart";
import { IconLoader } from "@tabler/icons-react";

import { formatDate } from "../../../../utils";
import { buildOrderData } from "../../../../utils/buildOrderData";
import { buildWhatsappMessage } from "../../../../utils/buildWhatsappMessage";

export const Details = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { totalPrice, cartItems, setCartItems, setOpenCart } = useCart();
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [deliveryType, setDeliveryType] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const deliveryFee = deliveryType === "delivery" ? 20 : 0;
  const total = totalPrice + deliveryFee;

  const handlePay = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      enqueueSnackbar("Por favor ingresa un nombre.", { variant: "warning" });
      return;
    }
    if (!phone.trim()) {
      enqueueSnackbar("Por favor ingresa un número de teléfono.", {
        variant: "warning",
      });
      return;
    }
    if (!deliveryType) {
      enqueueSnackbar("Selecciona un tipo de entrega.", { variant: "warning" });
      return;
    }
    if (deliveryType === "delivery" && !address.trim()) {
      enqueueSnackbar("Ingresa la dirección para el envío.", {
        variant: "warning",
      });
      return;
    }
    if (!paymentMethod) {
      enqueueSnackbar("Selecciona un método de pago.", { variant: "warning" });
      return;
    }

    setLoading(true);

    const today = new Date();
    const formattedDate = formatDate(today);
    const isoDate = today.toISOString();

    const orderData = buildOrderData({
      name,
      phone,
      cartItems,
      total: totalPrice + (deliveryType === "delivery" ? 20 : 0),
      paymentMethod,
      deliveryType,
      address,
      formattedDate,
    });

    const message = buildWhatsappMessage({
      name,
      phone,
      formattedDate,
      orderData,
      cartItems,
      totalPrice,
      deliveryType,
      address,
      total: totalPrice + (deliveryType === "delivery" ? 20 : 0),
    });

    const whatsappUrl = `https://wa.me/528120122416?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");

    setCartItems([]);
    setOpenCart(false);
    setLoading(false);

    fetch(
      "https://script.google.com/macros/s/AKfycbx0c7aaG3ShrrCm6KEuKsfXPYdfYjnS8Bo1uN4nwqmi-PZniQsS3OWJhEP4R1DNVz0l/exec",
      {
        method: "POST",
        body: JSON.stringify({
          ...orderData,
          fecha: isoDate,
          fechaLegible: formattedDate,
        }),
      }
    )
      .then(() => {
        console.log("res", res);
        enqueueSnackbar("Pedido guardado ✅", { variant: "success" });
      })
      .catch(() => {
        console.log("Error de google sheets");
      });
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
        <label className="font-medium text-gray-700">Número de teléfono</label>
        <input
          type="text"
          placeholder="812 234 5678"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
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
          disabled={loading}
          className={`bg-black text-white text-center py-2 rounded-lg transition cursor-pointer flex justify-center items-center gap-2 ${
            loading ? "opacity-70 cursor-not-allowed" : "hover:bg-black/80"
          }`}
        >
          {loading ? (
            <>
              <IconLoader className="animate-spin w-5 h-5" />
              Procesando...
            </>
          ) : (
            "Pagar"
          )}
        </button>
      </div>
    </div>
  );
};
