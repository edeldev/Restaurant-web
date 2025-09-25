import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    setTimeout(() => {
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          return;
        }
      }

      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  }, [pathname, hash]);

  return null;
};
