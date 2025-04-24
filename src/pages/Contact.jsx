import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { FaEnvelope, FaUser, FaCommentDots } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://formspree.io/f/mdkgobze", {
        method: "POST",
        body: new FormData(e.target),
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        alert("Pesan berhasil dikirim!");
        e.target.reset();
      } else {
        throw new Error("Gagal mengirim pesan");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Gagal mengirim pesan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-light py-5">
      <Container>
        <Button
          variant="link"
          className="mb-4 text-decoration-none"
          onClick={() => navigate(-1)}
        >
          ← Kembali
        </Button>
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <Card className="shadow-lg border-0 p-4">
              <Card.Body>
                <h2 className="text-center mb-4">📬 Contact Us</h2>
                <p className="text-center text-muted mb-5">
                  Have questions or need help? Feel free to reach out to us!
                </p>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>
                      <FaUser className="me-2 text-primary" />
                      Nama
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Masukkan nama Anda"
                      name="name"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>
                      <FaEnvelope className="me-2 text-primary" />
                      Email
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Masukkan email Anda"
                      name="email"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formMessage">
                    <Form.Label>
                      <FaCommentDots className="me-2 text-primary" />
                      Pesan
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      placeholder="Tulis pesan Anda di sini"
                      name="message"
                      required
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 fw-bold"
                    style={{ transition: "0.3s" }}
                    disabled={loading}
                  >
                    {loading ? "Mengirim..." : "Kirim Pesan"}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;
