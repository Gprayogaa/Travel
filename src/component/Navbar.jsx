import { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MyNavbar = () => {
  const [active, setActive] = useState("");
  const navigate = useNavigate();

  const handleNavigation = (path, sectionId) => {
    setActive(path);
    if (sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/");
        setTimeout(() => {
          const delayedSection = document.getElementById(sectionId);
          if (delayedSection) {
            delayedSection.scrollIntoView({ behavior: "smooth" });
          }
        }, 300);
      }
    } else {
      navigate(path);
    }
  };

  return (
    <Navbar expand="lg" className="bg-white shadow-sm py-3 fixed-top z-50">
      <Container>
        <Navbar.Brand
          onClick={() => handleNavigation("/", "hero")}
          className="text-xl font-bold cursor-pointer"
        >
          <span className="text-primary">Wisata</span>
          <span>Tour</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="ms-auto gap-3">
            <Nav.Link
              onClick={() => handleNavigation("/", "hero")}
              className={`cursor-pointer relative group overflow-hidden ${
                active === "/" ? "text-blue-600 font-bold" : ""
              }`}
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-blue-600">
                Home
              </span>
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </Nav.Link>

            <Nav.Link
              onClick={() => handleNavigation("/", "paketSlider")}
              className={`cursor-pointer relative group overflow-hidden ${
                active === "Travel Packages" ? "text-blue-600 font-bold" : ""
              }`}
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-blue-600">
                Travel Packages
              </span>
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </Nav.Link>

            <Nav.Link
              onClick={() => handleNavigation("/contact")}
              className={`cursor-pointer relative group overflow-hidden ${
                active === "/contact" ? "text-blue-600 font-bold" : ""
              }`}
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-blue-600">
                Contact
              </span>
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </Nav.Link>
          </Nav>       
          <Navbar.Text>
            <button className="ms-4 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg shadow-md transition-all duration-300 hover:scale-105 transform active:scale-95 whitespace-nowrap flex-shrink-0">
              Sign Up
            </button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;