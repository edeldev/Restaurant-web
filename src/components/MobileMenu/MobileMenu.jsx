import { motion, AnimatePresence } from "framer-motion";
import { IconX } from "@tabler/icons-react";
import { navLinks } from "../../utils";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export const MobileMenu = ({ open, setOpen }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/40 z-70 lg:hidden"
          onClick={() => setOpen(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute top-0 right-0 w-64 h-full bg-white text-black shadow-lg flex flex-col p-6 z-80"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <button
              type="button"
              className="self-end mb-6 text-gray-600 hover:text-primary cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <IconX stroke={1.5} />
            </button>

            <ul className="flex flex-col gap-y-6">
              {navLinks.map((link) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: link.id * 0.05 }}
                >
                  <HashLink
                    smooth
                    to={link.href}
                    className="block font-light uppercase text-sm hover:text-primary transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </HashLink>
                </motion.li>
              ))}
            </ul>

            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link
                to="/orders"
                className="block w-full text-center py-2 px-3 bg-primary text-white rounded-md hover:bg-amber-500 transition-colors duration-300"
              >
                Ordenar
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
