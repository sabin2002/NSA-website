import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2>NEPALESE</h2>
          <h4>Student Association (NSA)</h4>
          <p>
            The Nepalese Student Association (NSA) at Dongshin University
            supports Nepalese students through academic support, cultural
            activities, career opportunities, and community engagement.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <Link to="/home">Home</Link>
          <Link to="/events">Events</Link>
          <Link to="/jobs">Jobs</Link>
          <Link to="/notices">Announcements</Link>
          <Link to="/surveys">Surveys</Link>
          <Link to="/about">About Us</Link>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>
            <FaEnvelope /> nsa@dsu.ac.kr
          </p>
          <p>
            <FaMapMarkerAlt /> Dongshin University,
            Naju-si, Jeollanam-do, Republic of Korea
          </p>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>

          <div className="social-icons">
            <a href="#">
              <FaFacebook />
            </a>

            <a href="#">
              <FaInstagram />
            </a>

            <a href="#">
              <FaYoutube />
            </a>

            <a href="mailto:nsa@dsu.ac.kr">
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 Nepalese Student Association (NSA) · Dongshin University · All Rights Reserved
      </div>
    </footer>
  );
}

export default Footer;