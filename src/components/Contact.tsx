import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Hire Me / Start a Project</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Freelance Inquiries &amp; Connect</h4>
            <p>
              <a
                href="mailto:karampreets090@gmail.com"
                data-cursor="disable"
              >
                Email — karampreets090@gmail.com
              </a>
            </p>
            <p>
              <a
                href="https://www.linkedin.com/in/karampreet-singh-a8b108266"
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
              >
                LinkedIn — karampreet-singh-a8b108266
              </a>
            </p>
            <h4>Education</h4>
            <p>
              B.Tech in Artificial Intelligence &amp; Machine Learning, NIET,
              Greater Noida — 2024–2028
            </p>
          </div>
          <div className="contact-box">
            <h4>Social &amp; Live Work</h4>
            <a
              href="https://github.com/karampreet-singh-09"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              GitHub <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/karampreet-singh-a8b108266"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              LinkedIn <MdArrowOutward />
            </a>
            <a
              href="https://anchorcustoms.in"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Anchor Customs <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Available for <span>Freelance Projects</span> <br /> Designed &amp; Built by <span>Karampreet Singh</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
