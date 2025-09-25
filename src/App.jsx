import { Route, Routes } from "react-router-dom";
import { Home, Orders } from "./pages";
import { Layout } from "./layout";
import { ScrollToTop } from "./components";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/orders" element={<Orders />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
