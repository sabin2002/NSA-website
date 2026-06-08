import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBriefcase,
  FaCalendarAlt,
  FaBullhorn,
  FaBookOpen,
  FaInfoCircle,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
  FaBullseye,
  FaEye,
  FaUsers,
  FaHandshake,
  FaShieldAlt,
  FaStar,
  FaGraduationCap,
  FaHandsHelping,
} from "react-icons/fa";
import "./About.css";

function About() {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      

      <section className="about-hero">
        <h1>About Us</h1>
        <div className="divider"></div>
        <p>
          The Nepalese Student Association (NSA) is a non-profit organization
          dedicated to supporting Nepali students in Korea.
        </p>
        <p>
          We aim to build a strong community, promote cultural heritage, and help
          students grow academically, professionally, and personally.
        </p>
      </section>

      <main className="about-main">
        <section className="about-left">
          <div className="who-section">
            <img
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800"
              alt="Students"
            />

            <div>
              <h2>Who We Are</h2>
              <p>
                The Nepalese Student Association (NSA) is a community of Nepali
                students studying in various universities and colleges across
                Korea. We work together to create opportunities, provide support,
                and celebrate our culture while adapting to a new environment.
              </p>
            </div>
          </div>

          <section className="what-section">
            <h2>What We Do</h2>

            <div className="service-grid">
              <div className="service-card purple">
                <FaGraduationCap />
                <h4>Academic Support</h4>
                <p>We provide resources and guidance to help students excel in their studies.</p>
              </div>

              <div className="service-card green">
                <FaUsers />
                <h4>Community Building</h4>
                <p>We organize events and activities to bring Nepali students together.</p>
              </div>

              <div className="service-card orange">
                <FaBriefcase />
                <h4>Career Development</h4>
                <p>We share job opportunities, internships, and career guidance.</p>
              </div>

              <div className="service-card blue">
                <FaHome />
                <h4>Cultural Promotion</h4>
                <p>We celebrate Nepali culture and traditions in Korea.</p>
              </div>

              <div className="service-card pink">
                <FaHandsHelping />
                <h4>Welfare & Support</h4>
                <p>We support students in need and help them through challenges.</p>
              </div>
            </div>
          </section>

          <section className="team-section">
            <h2>Our Team</h2>
            <p>Meet the passionate students working behind NSA to serve the community.</p>

            <div className="team-grid">
              <div className="team-card">
                <img src="" />
                <div>
                  <h4>Glen Minlan</h4>
                  <span>President</span>
                  <p>Leading the NSA and representing students.</p>
                </div>
              </div>

              <div className="team-card">
                <img src="" />
                <div>
                  <h4>Thokar Alisha</h4>
                  <span>Vice President</span>
                  <p>Supporting the president and overseeing operations.</p>
                </div>
              </div>


            <button className="join-btn" onClick={() => navigate("/register")}>
              Join Us
            </button>
          </section>
        </section>

        <aside className="about-right">
          <div className="mission-card">
            <div className="mission-icon red"><FaBullseye /></div>
            <div>
              <h2>Our Mission</h2>
              <p>
                To empower Nepali students in Korea by providing a supportive
                network, enhancing academic and professional growth, and promoting
                unity, culture, and leadership.
              </p>
            </div>
          </div>

          <div className="mission-card">
            <div className="mission-icon blue"><FaEye /></div>
            <div>
              <h2>Our Vision</h2>
              <p>
                To be a leading platform that connects, inspires, and uplifts every
                Nepali student in Korea.
              </p>
            </div>
          </div>

          <div className="values-card">
            <h2>Our Values</h2>

            <div className="value-item">
              <FaUsers />
              <div>
                <h4>Unity</h4>
                <p>We believe in togetherness and mutual support.</p>
              </div>
            </div>

            <div className="value-item">
              <FaHandshake />
              <div>
                <h4>Respect</h4>
                <p>We respect diversity, ideas, and each other.</p>
              </div>
            </div>

            <div className="value-item">
              <FaShieldAlt />
              <div>
                <h4>Integrity</h4>
                <p>We act with honesty, transparency, and responsibility.</p>
              </div>
            </div>

            <div className="value-item">
              <FaStar />
              <div>
                <h4>Excellence</h4>
                <p>We strive for continuous improvement and success.</p>
              </div>
            </div>
          </div>

          <div className="contact-card">
            <h2>Get In Touch</h2>
            <p>We’d love to hear from you!</p>
            <p><FaEnvelope /> info@nsa-korea.org</p>
            <p>🌐 www.nsa-korea.org</p>
            <p>📍 Seoul, Republic of Korea</p>

            <div className="socials">
              <FaFacebook />
              <FaInstagram />
              <FaYoutube />
              <FaEnvelope />
            </div>
          </div>
        </aside>
      </main>

      <footer className="about-footer">
        <div>
          <h3>Nepalese Student Association (NSA)</h3>
          <p>Connecting Students in Korea 🇰🇷 🇳🇵</p>
        </div>

        <div>
          <h3>Quick Links</h3>
          <p>Home | Jobs | Events | Announcements | Resources | About Us</p>
        </div>

        <div>
          <h3>Follow Us</h3>
          <p>Facebook · Instagram · YouTube · Email</p>
        </div>

        <div>
          <p>© 2026 Nepalese Student Association.</p>
          <p>All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default About;