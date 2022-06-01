import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import ProductSlick from "../components/ProductSlick";
import MenuAppBar from "../components/MenuAppBar";
import Main from "../components/Main";
import Login from "../components/Login";
import Register from "../components/Register";
import Footer from "../components/Footer";
import Detail from "../components/Detail";
import BasketDetail from "../components/BasketDetail";

function AppRouter() {
  return (
    <div>
      <BrowserRouter>
        <MenuAppBar />
        <Main />
        <Routes>
          <Route path="/paramolsadabenalsam-altas" element={<ProductSlick />} />
          <Route path="/paramolsadabenalsam-altas/login" element={<Login />} />
          <Route path="/paramolsadabenalsam-altas/register" element={<Register />} />
          <Route path="/paramolsadabenalsam-altas/detail" element={<Detail />} />
          <Route path="/paramolsadabenalsam-altas/basket" element={<BasketDetail />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default AppRouter;
