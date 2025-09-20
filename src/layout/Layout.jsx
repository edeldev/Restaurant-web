import { useState } from "react";
import { Cart, MobileMenu, ScrollToTopButton } from "../components";
import { Outlet, Link } from "react-router-dom";
import { Nav } from "./components";

export const Layout = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="container mx-auto px-5 xl:px-0 py-5 flex justify-between items-center">
        <div className="flex-1 z-60">
          <Link to="/" className="font-bold text-lg uppercase">
            <img
              src="/logo.webp"
              alt="logo"
              className="w-20 h-auto object-cover"
            />
          </Link>
        </div>

        <Nav open={open} setOpen={setOpen} />

        <MobileMenu open={open} setOpen={setOpen} />
      </header>

      <Outlet />

      <footer className="p-5 text-center">
        <span>&copy; Restaurante hamburguesas Erick 2025</span>
      </footer>

      <Cart />

      <ScrollToTopButton />
    </>
  );
};
