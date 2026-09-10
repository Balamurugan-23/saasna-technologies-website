import "./App.css";

import {
  Smartphone,
  MessageCircle,
  ArrowRight,
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
} from "lucide-react";

import { useEffect, useState } from "react";
import { supabase } from "./supabase";

// ======================================================
// SHOP DETAILS
// ======================================================

const SHOP_NAME = "SAASNA TECHNOLOGIES";
const WHATSAPP_NUMBER = "916381780269";

const INSTAGRAM_URL =
  "https://www.instagram.com/saasnatechnologies/";

const LOCATION_URL =
  "https://maps.app.goo.gl/qNbEC5qZGkKU42w98";

const SHOP_ADDRESS =
  "No 11 Dennison Road, Near Vasantham Hospital, Nagercoil, Kanyakumari.";

// ======================================================
// LOGO
// ======================================================

import logo from "./assets/logo.png.jpeg";

// ======================================================
// MAIN APP
// ======================================================

function App() {
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true);

  // ====================================================
  // GET AVAILABLE PHONES FROM SUPABASE
  // ====================================================

  useEffect(() => {
    async function fetchPhones() {
      const { data, error } = await supabase
        .from("PHONES")
        .select("*")
        .eq("available", true)
        .order("id", { ascending: true });

      if (error) {
        console.error("Error fetching phones:", error);
      } else {
        setPhones(data || []);
      }

      setLoading(false);
    }

    fetchPhones();
  }, []);

  // ====================================================
  // WHATSAPP
  // ====================================================

  const openWhatsApp = (phoneName = "") => {
    const message = phoneName
      ? `Hi, I'm interested in the ${phoneName}. Please share the price and details.`
      : "Hi, I would like to know about the available second-hand mobiles.";

    const whatsappURL =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank");
  };

  // ====================================================
  // PAGE
  // ====================================================

  return (
    <div className="app">

      {/* ==================================================
          NAVIGATION
      ================================================== */}

      <header className="navbar">

        <a href="#home" className="brand">

          <div className="brand-logo-box">
            <img
              src={logo}
              alt="Saasna Technologies"
              className="brand-logo"
            />
          </div>

          <span className="brand-tagline">
            Your Trusted Tech Service Partner
          </span>

        </a>

        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#phones">Available Phones</a>
          <a href="#about">About Us</a>
        </nav>

        <button
          className="nav-whatsapp"
          onClick={() => openWhatsApp()}
        >
          <MessageCircle size={16} />
          WhatsApp
        </button>

      </header>

      {/* ==================================================
          MAIN
      ================================================== */}

      <main>

        {/* ==================================================
            HERO
        ================================================== */}

        <section className="hero" id="home">

          <div className="hero-content">

            <div className="hero-label">
              <span className="pulse-dot"></span>
              QUALITY USED PHONES AND LAPTOPS
            </div>

            <h1>
              Your technology.
              <br />
              <span>Our expertise.</span>
            </h1>

            <p>
              Discover carefully selected second-hand smartphones
              with genuine specifications and reliable service.
            </p>

            <div className="hero-actions">

              <a
                href="#phones"
                className="primary-button"
              >
                Explore Phones
                <ArrowRight size={17} />
              </a>

              <button
                className="secondary-button"
                onClick={() => openWhatsApp()}
              >
                <MessageCircle size={16} />
                Chat with us
              </button>

            </div>

            <div className="hero-trust">
              <span>✓ Genuine details</span>
              <span>✓ Personal assistance</span>
              <span>✓ Private pricing</span>
            </div>

          </div>

          {/* ==================================================
              IPHONE HERO VISUAL
          ================================================== */}

          <div className="hero-visual">

            <div className="visual-glow"></div>

            <div className="phone-showcase iphone-showcase">

              <div className="iphone-camera">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="iphone-screen">

                <div className="iphone-time">
                  9:41
                </div>

                <div className="iphone-logo">
                  SAASNA
                </div>

              </div>

            </div>

            <div className="floating-card">

              <span className="floating-check">
                ✓
              </span>

              <div>
                <strong>Private pricing</strong>

                <small>
                  Get your quote on WhatsApp
                </small>
              </div>

            </div>

          </div>

        </section>

        {/* ==================================================
            STATS
        ================================================== */}

        <section className="stats">

          <div>
            <strong>100%</strong>
            <span>Personal assistance</span>
          </div>

          <div>
            <strong>Daily</strong>
            <span>Updated availability</span>
          </div>

          <div>
            <strong>1 click</strong>
            <span>To request a quote</span>
          </div>

        </section>

        {/* ==================================================
            AVAILABLE PHONES
        ================================================== */}

        <section
          className="phones-section"
          id="phones"
        >

          <div className="section-heading">

            <div>

              <div className="section-label">
                OUR COLLECTION
              </div>

              <h2>
                Available Phones
              </h2>

              <p>
                Browse our latest available second-hand mobiles.
              </p>

            </div>

            <div className="availability">

              <span className="pulse-dot"></span>

              Updated regularly

            </div>

          </div>

          <div className="phone-grid">

            {loading ? (

              <p>
                Loading available phones...
              </p>

            ) : phones.length === 0 ? (

              <p>
                No phones available right now.
              </p>

            ) : (

              phones.map((phone) => (

                <PhoneCard
                  key={phone.id}
                  phone={phone}
                  onQuote={() =>
                    openWhatsApp(phone.NAME)
                  }
                />

              ))

            )}

          </div>

        </section>

        {/* ==================================================
            HOW IT WORKS
        ================================================== */}

        <section
          className="how-section"
          id="about"
        >

          <div className="section-label">
            HOW IT WORKS
          </div>

          <h2>
            Simple. Personal. Hassle-free.
          </h2>

          <div className="steps">

            <div className="step">

              <span className="step-number">
                01
              </span>

              <div className="step-icon">

                <Smartphone
                  size={30}
                  strokeWidth={1.8}
                />

              </div>

              <h3>
                Choose a phone
              </h3>

              <p>
                Browse the phones currently available
                in our collection.
              </p>

            </div>

            <div className="step">

              <span className="step-number">
                02
              </span>

              <div className="step-icon">

                <MessageCircle
                  size={30}
                  strokeWidth={1.8}
                />

              </div>

              <h3>
                Request a quote
              </h3>

              <p>
                Send the phone details to us through
                WhatsApp.
              </p>

            </div>

            <div className="step">

              <span className="step-number">
                03
              </span>

              <div className="step-icon">
                🤝
              </div>

              <h3>
                Get your deal
              </h3>

              <p>
                We'll reply personally with the price
                and details.
              </p>

            </div>

          </div>

        </section>

        {/* ==================================================
            CTA
        ================================================== */}

        <section className="cta-section">

          <div>

            <div className="section-label light">
              LOOKING FOR A PHONE?
            </div>

            <h2>
              Let's find the right one for you.
            </h2>

            <p>
              Have a specific model in mind?
              Send us a message.
            </p>

          </div>

          <button
            className="cta-button"
            onClick={() => openWhatsApp()}
          >

            <MessageCircle size={17} />

            Message us on WhatsApp

            <ArrowRight size={17} />

          </button>

        </section>

      </main>

      {/* ==================================================
          FOOTER
      ================================================== */}

      <footer className="footer">

        <div className="footer-top">

          {/* ==================================================
              FOOTER BRAND + SERVICES
          ================================================== */}

          <div>

            <a
              href="#home"
              className="brand footer-brand"
            >

              <div className="brand-logo-box">

                <img
                  src={logo}
                  alt="Saasna Technologies"
                  className="brand-logo"
                />

              </div>

              <span className="brand-tagline">
                Your Trusted Tech Service Partner
              </span>

            </a>

            <p className="footer-services">

              📱 Mobile & Laptop Sales & Service

              <br />

              💻 OS & Software Installation

              <br />

              💾 Data Recovery

              <br />

              📹 CCTV Installation and more

            </p>

          </div>

          {/* ==================================================
              QUICK LINKS
          ================================================== */}

          <div className="footer-links">

            <strong>
              Quick Links
            </strong>

            <a href="#home">
              Home
            </a>

            <a href="#phones">
              Available Phones
            </a>

            <a href="#about">
              How It Works
            </a>

          </div>

          {/* ==================================================
              CONNECT WITH US
          ================================================== */}

          <div className="footer-links">

            <strong>
              Connect With Us
            </strong>

            {/* Instagram */}

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
            >

              <span className="social-symbol">
                ◎
              </span>

              Instagram ↗

            </a>

            {/* WhatsApp */}

            <button
              onClick={() => openWhatsApp()}
            >

              <MessageCircle size={16} />

              WhatsApp ↗

            </button>

            {/* Address */}

            <a
              href={LOCATION_URL}
              target="_blank"
              rel="noreferrer"
              className="footer-address"
            >

              <MapPin size={16} />

              <span>
                No 11 Dennison Road,
                <br />
                Near Vasantham Hospital,
                <br />
                Nagercoil, Kanyakumari.
              </span>

            </a>

            {/* Google Maps */}

            <a
              href={LOCATION_URL}
              target="_blank"
              rel="noreferrer"
              className="location-link"
            >

              <MapPin size={15} />

              View Location ↗

            </a>

          </div>

        </div>

        {/* ==================================================
            FOOTER BOTTOM
        ================================================== */}

        <div className="footer-bottom">

          <span>
            © 2026 {SHOP_NAME}. All rights reserved.
          </span>

          <span>
            Mobile & Laptop Sales & Service
          </span>

        </div>

      </footer>

    </div>
  );
}

// ======================================================
// PHONE CARD
// ======================================================

function PhoneCard({ phone, onQuote }) {

  // Collect all available images

  const images = [
    phone.IMAGE,
    phone.IMAGE2,
    phone.IMAGE3,
  ].filter(Boolean);

  const [selectedImage, setSelectedImage] =
    useState(null);

  // ====================================================
  // OPEN IMAGE
  // ====================================================

  const openImage = (index) => {
    setSelectedImage(index);
  };

  // ====================================================
  // CLOSE IMAGE
  // ====================================================

  const closeImage = () => {
    setSelectedImage(null);
  };

  // ====================================================
  // PREVIOUS IMAGE
  // ====================================================

  const previousImage = () => {

    setSelectedImage((current) => {

      if (current === 0) {
        return images.length - 1;
      }

      return current - 1;

    });

  };

  // ====================================================
  // NEXT IMAGE
  // ====================================================

  const nextImage = () => {

    setSelectedImage((current) => {

      if (current === images.length - 1) {
        return 0;
      }

      return current + 1;

    });

  };

  return (
    <>

      {/* ==================================================
          PHONE CARD
      ================================================== */}

      <article className="phone-card">

        <div className="phone-card-image">

          {images.length > 0 ? (

            <div className="phone-collage">

              {images.map((image, index) => (

                <img
                  key={index}
                  src={image}
                  alt={`${phone.NAME} photo ${index + 1}`}
                  className="phone-real-image"
                  onClick={() => openImage(index)}
                />

              ))}

            </div>

          ) : (

            <div className="phone-illustration">

              <Smartphone
                size={72}
                strokeWidth={1.5}
              />

            </div>

          )}

          {/* CONDITION */}

          <span className="condition-badge">

            <span className="pulse-dot"></span>

            {phone.condition}

          </span>

          {/* AVAILABLE */}

          <span className="image-tag">
            AVAILABLE
          </span>

        </div>

        {/* ==================================================
            CARD CONTENT
        ================================================== */}

        <div className="phone-card-content">

          <div className="phone-card-top">

            <div>

              <h3>
                {phone.NAME}
              </h3>

              <p>
                {phone.specs}
              </p>

            </div>

            <span className="arrow-circle">

              <ArrowRight size={16} />

            </span>

          </div>

          <div className="card-divider"></div>

          <button
            className="quote-button"
            onClick={onQuote}
          >

            Get Quote

            <ArrowRight size={17} />

          </button>

        </div>

      </article>

      {/* ==================================================
          FULL SCREEN IMAGE VIEWER
      ================================================== */}

      {selectedImage !== null && (

        <div
          className="image-viewer"
          onClick={closeImage}
        >

          {/* CLOSE */}

          <button
            className="viewer-close"
            onClick={closeImage}
            aria-label="Close image viewer"
          >

            <X size={28} />

          </button>

          {/* PREVIOUS */}

          {images.length > 1 && (

            <button
              className="viewer-arrow viewer-left"
              onClick={(e) => {
                e.stopPropagation();
                previousImage();
              }}
              aria-label="Previous image"
            >

              <ChevronLeft size={32} />

            </button>

          )}

          {/* IMAGE */}

          <div
            className="viewer-content"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <img
              src={images[selectedImage]}
              alt={`${phone.NAME} enlarged`}
              className="viewer-image"
            />

            <div className="viewer-info">

              <strong>
                {phone.NAME}
              </strong>

              <span>
                {selectedImage + 1} / {images.length}
              </span>

            </div>

          </div>

          {/* NEXT */}

          {images.length > 1 && (

            <button
              className="viewer-arrow viewer-right"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              aria-label="Next image"
            >

              <ChevronRight size={32} />

            </button>

          )}

        </div>

      )}

    </>
  );
}

export default App;