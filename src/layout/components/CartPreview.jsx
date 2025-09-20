import { IconX } from "@tabler/icons-react";
import { useCart } from "../../hooks/useCart";
import { AnimatePresence, motion } from "framer-motion";

export const CartPreview = () => {
  const {
    setOpenCart,
    openCartPreview,
    setOpenCartPreview,
    lastAddedItem,
    totalPrice,
    totalItems,
  } = useCart();

  return (
    <AnimatePresence>
      {openCartPreview && lastAddedItem && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenCartPreview(false)}
          />

          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 w-full md:left-auto md:bottom-auto md:absolute md:top-full md:right-0 md:mt-2 md:w-md bg-white text-black md:rounded-xl shadow-lg border border-gray-200 p-4 z-50"
          >
            <div className="mb-2 flex justify-end">
              <IconX
                stroke={1.5}
                className="cursor-pointer"
                onClick={() => setOpenCartPreview(false)}
              />
            </div>
            <div className="flex flex-col gap-8">
              <h4 className="text-xl font-semibold">Producto agregado</h4>
              <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <div className="p-3 rounded-sm bg-[#F4F4F4] w-25 h-20">
                    <img
                      src={lastAddedItem.img}
                      alt={lastAddedItem.text}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div>
                    <h5 className="font-semibold text-[#393c41] leading-4">
                      {lastAddedItem.text}{" "}
                      {lastAddedItem.selectedSauce &&
                        `(${lastAddedItem.selectedSauce})`}
                    </h5>
                    <span className="text-gray-500 text-sm">
                      Cantidad: {lastAddedItem.qty}
                    </span>
                  </div>
                </div>
                <span className="font-semibold">${lastAddedItem.price}</span>
              </div>

              <hr className="text-gray-500/20" />

              <div className="flex justify-between items-center">
                <p className="text-xl font-semibold">Subtotal</p>
                <span className="font-semibold text-xl">${totalPrice}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setOpenCartPreview(false);
                  setOpenCart(true);
                }}
                className="mt-3 w-full bg-primary text-white py-2 rounded-lg hover:bg-amber-400 cursor-pointer transition"
              >
                Ver pedido ({totalItems})
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
