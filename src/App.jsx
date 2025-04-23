import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Home from "./pages/Home";
import DetailPaket from "./pages/DetailPaket";
import PaketWisata from "./component/PaketWisata";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Home />
                  <PaketWisata />
                </>
              }
            />
            <Route path="/detail/:id" element={<DetailPaket />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
