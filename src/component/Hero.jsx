import { useNavigate } from "react-router-dom";
import { Carousel, Button, Container } from "react-bootstrap";

const Hero = () => {
  const navigate = useNavigate();

  const carouselItems = [
    {
      image:
        "https://i.pinimg.com/736x/65/62/17/656217e98ddcc3482fc7bf4f03fdbd27.jpg",
      title: "Discover Your Perfect Indonesian Escape",
      description:
        "From the pristine beaches of Bali to the majestic volcanoes of Java, experience the ultimate adventure.",
    },
    {
      image: "https://i.pinimg.com/736x/28/bd/48/28bd481f44dbd7315e7853c2a43b05e4.jpg",
      title: "Explore Magnificent Destinations",
      description:
        "Immerse yourself in Indonesia's rich culture and natural wonders.",
    },
    {
      image: "https://i.pinimg.com/736x/97/8b/f2/978bf2d49035f5122b9a0a703a54a200.jpg",
      title: "Unforgettable Adventures Await",
      description:
        "Create lasting memories with our carefully curated travel experiences.",
    },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/paketwisata");
    }
  };

  return (
    <section id="hero" className="relative min-h-screen">
      <Carousel fade interval={5000} pause={false}>
        {carouselItems.map((item, index) => (
          <Carousel.Item key={index}>
            <div
              className="min-h-screen bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${item.image}')`,
              }}
            >
              <Container className="relative z-10 text-center text-white min-h-screen d-flex align-items-center justify-content-center">
                <div className="max-w-4xl">
                  <h1
                    className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight tracking-tight"
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                      background: "linear-gradient(45deg, #ffffff, #b3d9ff)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    {item.title}
                  </h1>

                  <p
                    className="text-xl md:text-2xl text-gray-100 mb-10 max-w-2xl mx-auto leading-relaxed"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 300,
                      letterSpacing: "0.5px",
                    }}
                  >
                    {item.description}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      type="button"
                      onClick={() => scrollToSection("paketSlider")}
                      variant="primary"
                      size="lg"
                      className="px-10 py-3 rounded-pill fw-bold text-uppercase"
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        letterSpacing: "1px",
                        background:
                          "linear-gradient(to right, #0d6efd, #0b5ed7)",
                        border: "none",
                        boxShadow: "0 4px 15px rgba(13, 110, 253, 0.4)",
                      }}
                    >
                      Explore Packages
                    </Button>
                  </div>
                </div>
              </Container>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
};

export default Hero;
