import React from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Beranda from "./components/pages/beranda";
import Peserta from "./components/pages/peserta";
import EditPeserta from "./components/pages/EditPeserta";
import Navbar from "./components/navbar";

export default function App(){
  return (
    <React.StrictMode>
      <BrowserRouter>
        <div>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Beranda/>}/>
            <Route path="/peserta" element={<Peserta/>}/>
              <Route path="/edit-peserta/:id" element={<EditPeserta/>}/>

          </Routes>
        </div>
      </BrowserRouter>
    </React.StrictMode>
  )
}