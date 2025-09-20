import { IconStarFilled } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useCart } from "../../../hooks/useCart";
import { useState } from "react";
import { useSnackbar } from "notistack";

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delay: i * 0.12,
    },
  }),
  hover: {
    scale: 1.05,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
  tap: {
    scale: 0.97,
    transition: { type: "spring", stiffness: 500, damping: 30 },
  },
};

const imageVariants = {
  hover: {
    scale: 1.08,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
  tap: {
    scale: 0.95,
    transition: { type: "spring", stiffness: 500, damping: 30 },
  },
};

export const CardGrid = ({ items }) => {
  const { addToCart } = useCart();
  const [selectedSauce, setSelectedSauce] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  const handleAdd = (item) => {
    if (item.sauces && !selectedSauce[item.id]) {
      enqueueSnackbar(
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
          className="text-white font-medium"
        >
          🍗 Elige una salsa antes de agregar al carrito
        </motion.div>,
        {
          variant: "error",
          autoHideDuration: 2500,
          anchorOrigin: { vertical: "top", horizontal: "center" },
        }
      );
      return;
    }

    addToCart({
      ...item,
      selectedSauce: selectedSauce[item.id] || null,
    });
    setSelectedSauce({});
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {items.map((item, i) => (
        <motion.div
          key={item.id}
          variants={cardVariants}
          initial="hidden"
          animate="show"
          custom={i}
          whileHover="hover"
          onClick={() => handleAdd(item)}
          className="cursor-pointer rounded-3xl bg-[#111]/70 backdrop-blur-sm ring-1 ring-white/5 p-6 md:p-8 flex flex-col h-full gap-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_20px_60px_rgba(0,0,0,0.35)]"
        >
          <div className="flex-1 flex flex-col gap-3">
            <motion.img
              src={item.img}
              alt={item.text}
              className="rounded-2xl w-full object-cover cursor-pointer h-50 md:h-36 overflow-hidden"
              variants={imageVariants}
            />
            <h4 className="font-bold text-lg">{item.text}</h4>
          </div>

          {item.sauces && (
            <div className="flex gap-2 flex-wrap">
              {item.sauces.map((sauce) => (
                <button
                  key={sauce}
                  type="button"
                  className={`cursor-pointer px-3 py-1 rounded-full text-sm transition ${
                    selectedSauce[item.id] === sauce
                      ? "bg-[#D4AF37]/60 border border-[#D4AF37] text-white"
                      : "bg-[#ffffff0d] border border-[#ffffff30] text-white hover:bg-[#ffffff1a]"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSauce((prev) => ({ ...prev, [item.id]: sauce }));
                  }}
                >
                  {sauce}
                </button>
              ))}
            </div>
          )}

          <div className="flex justify-between items-center">
            <div className="flex gap-1 text-yellow-400">
              {[...Array(item.stars || 5)].map((_, idx) => (
                <IconStarFilled key={idx} size={18} />
              ))}
            </div>
            <span className="font-semibold">${item.price}</span>
          </div>

          <button
            type="button"
            className="py-2 px-3 rounded-md transition-colors duration-300 bg-[#af5900] text-white text-center
              hover:bg-amber-500 cursor-pointer"
          >
            Agregar al carrito
          </button>
        </motion.div>
      ))}
    </div>
  );
};
