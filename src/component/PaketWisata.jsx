import { useEffect, useRef, useState } from "react";
import { Button, Container, Card, Form, Pagination } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const PaketWisata = () => {
  const [paket, setPaket] = useState([]);
  const [kategoriAktif, setKategoriAktif] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const navigate = useNavigate();

  // Responsive title style
  const titleStyle = {
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 700,
    fontSize: "clamp(1.8rem, 5vw, 2.5rem)", // Responsive font size
    textAlign: "center",
    marginBottom: "clamp(1rem, 3vw, 1.5rem)", // Responsive margin
    color: "#2c3e50",
    textTransform: "uppercase",
    letterSpacing: "1px",
  };

  // Responsive card title style
  const cardTitleStyle = {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 600,
    fontSize: "clamp(1rem, 2vw, 1.2rem)", // Responsive font size
    textAlign: "center",
    marginBottom: "0.8rem",
    color: "#2c3e50",
  };

  // Responsive card text style
  const cardTextStyle = {
    fontFamily: "'Open Sans', sans-serif",
    fontSize: "clamp(0.85rem, 1.5vw, 0.95rem)", // Responsive font size
    textAlign: "left", // Changed from center to left
    color: "#7f8c8d",
  };

  // Price style
  const priceStyle = {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 600,
    fontSize: "clamp(1rem, 1.8vw, 1.1rem)",
    color: "#2c3e50",
    marginTop: "auto",
    marginBottom: "0.5rem",
  };

  // Fetch data from API on component mount
  useEffect(() => {
    axios
      .get("https://gprayogaa.github.io/paket-wisata-api/paketwisata.json")
      .then((response) => setPaket(response.data))
      .catch((error) => console.error("Gagal mengambil data:", error));
  }, []);

  const kategoriUnik = [
    "Semua",
    ...new Set(paket.map((item) => item.category)),
  ];

  const paketFiltered = paket
    .filter(
      (item) => kategoriAktif === "Semua" || item.category === kategoriAktif
    )
    .filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Pagination for view all mode
  const cardsPerPage = 12;
  const totalPages = Math.ceil(paketFiltered.length / cardsPerPage);
  const currentCards = paketFiltered.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage
  );

  // Mouse drag scrolling for slider
  const startDrag = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
    scrollRef.current.style.cursor = "grabbing";
  };

  const duringDrag = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const endDrag = () => {
    isDragging.current = false;
    scrollRef.current.style.cursor = "grab";
  };

  return (
    <section
      id="paketSlider"
      style={{
        backgroundColor: "#f8f9fa",
        padding: "clamp(30px, 5vw, 60px) 0", // Responsive padding
      }}
    >
      <Container>
        {/* Title with custom styling */}
        <h2 className="fw-bold" style={titleStyle}>
          Paket Wisata
        </h2>

        {/* Search and View All button in one row */}
        <div className="d-flex flex-wrap justify-content-center align-items-center gap-3 mb-4">
          <Form
            style={{
              width: "min(400px, 100%)", // Responsive width
              marginBottom: 0,
            }}
          >
            <Form.Control
              type="text"
              placeholder="Cari paket wisata..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowAll(false);
                setCurrentPage(1);
              }}
              style={{
                fontFamily: "'Open Sans', sans-serif",
              }}
            />
          </Form>
          <Button
            variant="outline-primary"
            onClick={() => {
              setShowAll(!showAll);
              setCurrentPage(1);
            }}
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 500,
              padding: "0.375rem 1.5rem",
            }}
          >
            {showAll ? "Close" : "View All"}
          </Button>
        </div>

        {/* Kategori with enhanced animations */}
        <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
          {kategoriUnik.map((kategori, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: idx * 0.1,
                type: "spring",
                stiffness: 100,
              }}
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.95 }}
                className={`btn ${
                  kategoriAktif === kategori
                    ? "btn-primary"
                    : "btn-outline-primary"
                }`}
                onClick={() => {
                  setKategoriAktif(kategori);
                  setShowAll(false);
                }}
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(0.875rem, 1.5vw, 1rem)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <motion.span
                  initial={false}
                  animate={{
                    y: kategoriAktif === kategori ? 0 : 20,
                    opacity: kategoriAktif === kategori ? 1 : 0,
                  }}
                  className="position-absolute inset-0 bg-primary"
                  style={{
                    zIndex: -1,
                    borderRadius: "inherit",
                  }}
                />
                {kategori}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {showAll ? (
          <AnimatePresence mode="wait">
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Grid view for "View All" mode with pagination */}
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-3 g-md-4 mb-4">
                {currentCards.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    className="col"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                  >
                    <Card
                      className="h-100 border border-gray-200 hover:border-primary transition-colors duration-300 shadow-sm"
                      onClick={() => navigate(`/detail/${item.id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      <Card.Img
                        variant="top"
                        src={item.image}
                        alt={item.title}
                        style={{
                          height: "clamp(150px, 25vw, 200px)", // Responsive height
                          objectFit: "cover",
                          pointerEvents: "none",
                          borderTopLeftRadius: "0.5rem",
                          borderTopRightRadius: "0.5rem",
                        }}
                      />
                      <Card.Body className="d-flex flex-column">
                        <Card.Title style={cardTitleStyle}>
                          {item.title}
                        </Card.Title>
                        <Card.Text style={cardTextStyle}>
                          {item.description}
                        </Card.Text>
                        <p style={priceStyle}>
                          Rp {item.price.toLocaleString("id-ID")}
                        </p>
                      </Card.Body>
                    </Card>
                  </motion.div>
                ))}
              </div>
              {showAll && totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="d-flex justify-content-center mt-4"
                >
                  <Pagination>
                    <Pagination.First
                      onClick={() => setCurrentPage(1)}
                      disabled={currentPage === 1}
                    />
                    <Pagination.Prev
                      onClick={() => setCurrentPage((curr) => curr - 1)}
                      disabled={currentPage === 1}
                    />

                    {[...Array(totalPages)].map((_, idx) => (
                      <Pagination.Item
                        key={idx + 1}
                        active={currentPage === idx + 1}
                        onClick={() => setCurrentPage(idx + 1)}
                      >
                        {idx + 1}
                      </Pagination.Item>
                    ))}

                    <Pagination.Next
                      onClick={() => setCurrentPage((curr) => curr + 1)}
                      disabled={currentPage === totalPages}
                    />
                    <Pagination.Last
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={currentPage === totalPages}
                    />
                  </Pagination>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key="slider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="position-relative"
            >
              {/* Slider view with cursor-based scrolling */}
              <div
                ref={scrollRef}
                className="paket-slider-wrapper d-flex overflow-auto py-3 gap-3"
                style={{
                  scrollBehavior: "smooth",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  cursor: "grab",
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                }}
                onMouseDown={startDrag}
                onMouseMove={duringDrag}
                onMouseUp={endDrag}
                onMouseLeave={endDrag}
              >
                {paketFiltered.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                  >
                    <Card
                      className="flex-shrink-0 border border-gray-200 hover:border-primary transition-colors duration-300 shadow-sm"
                      onClick={() => navigate(`/detail/${item.id}`)}
                      style={{
                        width: "min(280px, 80vw)", // Responsive card width
                        height: "auto", // Auto height instead of fixed
                        minHeight: "clamp(350px, 60vw, 420px)", // Responsive min-height
                        scrollSnapAlign: "start",
                        userSelect: "none",
                        cursor: "pointer",
                      }}
                    >
                      <Card.Img
                        variant="top"
                        src={item.image}
                        alt={item.title}
                        style={{
                          height: "clamp(150px, 25vw, 180px)", // Responsive height
                          objectFit: "cover",
                          pointerEvents: "none",
                          borderTopLeftRadius: "0.5rem",
                          borderTopRightRadius: "0.5rem",
                        }}
                      />
                      <Card.Body className="d-flex flex-column p-4">
                        <Card.Title style={cardTitleStyle}>
                          {item.title}
                        </Card.Title>
                        <Card.Text style={cardTextStyle}>
                          {item.description}
                        </Card.Text>
                        <p style={priceStyle}>
                          Rp {item.price.toLocaleString("id-ID")}
                        </p>
                      </Card.Body>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </Container>

      {/* Add font imports in the head of your HTML or in your CSS */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Poppins:wght@500;600&family=Open+Sans&display=swap');
        `}
      </style>
    </section>
  );
};

export default PaketWisata;
