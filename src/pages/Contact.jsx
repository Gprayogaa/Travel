import React from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { FaEnvelope, FaUser, FaCommentDots } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="bg-light py-5" >
    <Container>
      
      <Button
        variant="link"
        className="mb-4 text-decoration-none"
        onClick={() => navigate(-1)} // Navigasi kembali ke halaman sebelumnya
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
                <Form>
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>
                      <FaUser className="me-2 text-primary" />
                      Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
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
                      placeholder="Enter your email"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formMessage">
                    <Form.Label>
                      <FaCommentDots className="me-2 text-primary" />
                      Message
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      placeholder="Write your message here"
                      required
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 fw-bold"
                    style={{ transition: "0.3s" }}
                  >
                    Send Message
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
