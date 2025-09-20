import { HashLink } from "react-router-hash-link";
import { navLinks } from "../../utils";
import { ButtonLink } from "../../components";
import { IconMenu, IconShoppingCart } from "@tabler/icons-react";
import { useCart } from "../../hooks/useCart";
import { CartPreview } from "./CartPreview";

export const Nav = ({ open, setOpen }) => {
  const { openCart, setOpenCart, totalItems, setOpenCartPreview } = useCart();
  return (
    <>
      <nav className="hidden lg:block z-60">
        <ul className="flex gap-x-10">
          {navLinks.map((link) => (
            <li key={link.id}>
              <HashLink
                smooth
                to={link.href}
                className="font-light uppercase text-sm p-1.5 rounded-md hover:text-primary hover:bg-amber-50 transition-colors duration-300"
              >
                {link.label}
              </HashLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex gap-x-4 items-center flex-1 justify-end relative">
        <div className="hidden md:flex z-60">
          <ButtonLink
            href="/orders"
            text="Ordenar"
            className="bg-primary text-white hover:bg-amber-400 shadow-lg shadow-[#D4AF37]/40"
          />
        </div>
        <div
          className="relative z-60 cursor-pointer px-3 py-2 bg-[#ffffff0d] hover:bg-[#ffffff2a] transition-colors duration-300 rounded-md text-primary"
          onClick={() => {
            setOpenCart(!openCart);
            setOpenCartPreview(false);
          }}
        >
          <IconShoppingCart stroke={1.5} />
          <span className="absolute bottom-0 right-0 translate-1 bg-amber-50 text-black px-2 py-1 rounded-full w-4 h-4 flex justify-center items-center text-[10px]">
            {totalItems > 0 ? totalItems : "0"}
          </span>
        </div>

        <CartPreview />
        <div
          className="lg:hidden z-60 cursor-pointer px-3 py-2 bg-amber-50 hover:bg-amber-50/80 transition-colors duration-300 rounded-md text-primary"
          onClick={() => {
            setOpen(!open);
            setOpenCartPreview(false);
          }}
        >
          <IconMenu stroke={1.5} />
        </div>
      </div>
    </>
  );
};
