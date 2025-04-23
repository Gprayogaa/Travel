import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Button, Card, ListGroup } from "react-bootstrap";

const DetailPaket = () => {
  const { id } = useParams();
  const [paket, setPaket] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://gprayogaa.github.io/paket-wisata-api/paketwisata.json")
      .then((response) => {
        const found = response.data.find((item) => item.id === parseInt(id));
        setPaket(found);
      })
      .catch((error) => {
        console.error("Gagal mengambil data:", error);
      });
  }, [id]);

  if (!paket) return <div className="text-center py-5">Memuat...</div>;

  return (
    <div className="bg-light py-5">
      <Container>
        <Button
          variant="link"
          className="mb-4 text-decoration-none"
          onClick={() => navigate(-1)} // Navigasi kembali ke halaman sebelumnya
        >
          ← Kembali
        </Button>

        <Card
          className="shadow-sm p-4"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          <Row>
            {/* LEFT SIDE */}
            <Col lg={8}>
              <h1 className="mb-4 fw-bold display-6">{paket.title}</h1>
              <p className="text-muted">Kategori: {paket.category}</p>
              <p>{paket.description}</p>

              <div className="mt-4">
                <h5>Destinasi</h5>
                <ListGroup variant="flush" className="mb-3">
                  {paket.places?.map((place, i) => (
                    <ListGroup.Item key={i}>{place}</ListGroup.Item>
                  ))}
                </ListGroup>
              </div>

              <div>
                <h5>Detail</h5>
                <Row>
                  <Col sm={6}>
                    <p>
                      <strong>Durasi:</strong> {paket.duration}
                    </p>
                    <p>
                      <strong>Minimal Peserta:</strong> 2 orang
                    </p>
                  </Col>
                  <Col sm={6}>
                    <p>
                      <strong>Harga:</strong> Rp{" "}
                      {paket.price.toLocaleString("id-ID")}
                    </p>
                    <p>
                      <strong>Jadwal:</strong> Setiap hari
                    </p>
                  </Col>
                </Row>
              </div>
            </Col>

            {/* RIGHT SIDE */}
            <Col lg={4}>
              <img
                src={paket.image}
                alt={paket.title}
                className="img-fluid rounded mb-3"
              />

              <div className="d-grid gap-2">
                <Button variant="primary" size="lg">
                  Pesan Sekarang
                </Button>

                <Button
                  onClick={() => {
                    navigate("/"); 
                    setTimeout(() => {
                      const paketSlider =
                        document.getElementById("paketSlider");
                      if (paketSlider) {
                        paketSlider.scrollIntoView({ behavior: "smooth" }); 
                      }
                    }, 100); 
                  }}
                  variant="outline-primary"
                  size="lg"
                >
                  Kembali ke Paket Travel
                </Button>
              </div>
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  );
};

export default DetailPaket;
