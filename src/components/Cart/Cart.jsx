import { motion, AnimatePresence } from "framer-motion";
import { IconX } from "@tabler/icons-react";
import { useCart } from "../../hooks/useCart";
import { EmptyCart } from "./components/EmptyCart";
import { CartItem } from "./components/CartItem";
import { Details } from "./components";

export const Cart = () => {
  const { openCart, setOpenCart, cartItems, removeFromCart, updateQuantity } =
    useCart();

  return (
    <AnimatePresence>
      {openCart && (
        <motion.div
          className="fixed inset-0 bg-black/40 z-70"
          onClick={() => setOpenCart(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute top-0 right-0 w-full sm:w-120 h-full bg-[#FFFFFFCC] backdrop-blur-sm text-black shadow-lg flex flex-col p-6 z-80"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute self-end mb-6 text-gray-600 border p-1 rounded-sm hover:bg-[#99949480] transition-colors duration-300 cursor-pointer"
              onClick={() => setOpenCart(false)}
            >
              <IconX stroke={1} />
            </button>

            {cartItems.length === 0 ? (
              <EmptyCart />
            ) : (
              <div className="flex-1 overflow-y-auto space-y-4 mt-15">
                <div className="bg-[#111] backdrop-blur-sm ring-1 ring-white/5 text-white p-6 rounded-2xl">
                  <h3 className="text-xl font-bold ">Tu orden</h3>
                  <AnimatePresence>
                    {cartItems.map((item, index) => (
                      <CartItem
                        key={`${item.id}-${item.selectedSauce || "none"}`}
                        item={item}
                        updateQuantity={updateQuantity}
                        removeFromCart={removeFromCart}
                        isLast={index === cartItems.length - 1}
                      />
                    ))}
                  </AnimatePresence>
                </div>
                <Details />
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
