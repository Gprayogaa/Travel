import { Container, Row, Col, Nav } from "react-bootstrap";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-dark py-5 border-top shadow-sm">
      <Container>
        <Row className="gy-4">
          {/* Logo & Deskripsi */}
          <Col md={4}>
            <h5 className="fw-bold">
              <span className="text-primary">Wisata</span>Tour
            </h5>
            <p className="text-muted small">
              Jelajahi keindahan Indonesia bersama kami, dari Sabang sampai Merauke.
            </p>
          </Col>

          {/* Link Navigasi */}
          <Col md={4}>
            <h6 className="fw-semibold mb-3">Navigasi</h6>
            <Nav className="flex-column">
              <Nav.Link href="#" className="text-muted px-0 py-1">Beranda</Nav.Link>
              <Nav.Link href="#" className="text-muted px-0 py-1">Paket Wisata</Nav.Link>
              <Nav.Link href="#" className="text-muted px-0 py-1">Destinasi</Nav.Link>
              <Nav.Link href="#" className="text-muted px-0 py-1">Hubungi Kami</Nav.Link>
            </Nav>
          </Col>

          {/* Kontak & Sosial */}
          <Col md={4}>
            <h6 className="fw-semibold mb-3">Kontak</h6>
            <p className="text-muted small mb-1">Email: support@WisataTour.com</p>
            <p className="text-muted small mb-3">Telepon: +62 895-2978-2073</p>
            <div className="d-flex gap-3">
              <a href="https://www.instagram.com/denkoow_?igsh=NjZjNjJnM3VrcjZu" className="text-muted fs-5 hover-icon"><FaInstagram /></a>
              <a href="#" className="text-muted fs-5 hover-icon"><FaFacebook /></a>
              <a href="https://wa.me/6289529782073?text=Halo%2C%20saya%20tertarik%20dengan%20paket%20wisatanya" className="text-muted fs-5 hover-icon"><FaWhatsapp /></a>
            </div>
          </Col>
        </Row>

        {/* Bawah */}
        <div className="text-center text-secondary small pt-4 mt-4 border-top">
          &copy; 2025 WisataTour. Semua hak dilindungi.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
