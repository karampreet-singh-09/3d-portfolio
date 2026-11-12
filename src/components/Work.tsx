import { useState, useCallback, useRef } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward, MdArrowOutward } from "react-icons/md";

interface ProjectItem {
  title: string;
  domain: string;
  clientType: string;
  category: string;
  tools: string;
  image: string;
  fallbackImage: string;
  link: string;
  secondaryLink?: {
    label: string;
    url: string;
  };
  caseStudy: {
    challenge: string;
    solution: string;
    impact: string;
  };
}

const projects: ProjectItem[] = [
  {
    title: "Anchor Customs",
    domain: "anchorcustoms.in",
    clientType: "Freelance Client • Custom E-Commerce",
    category: "Bespoke Personalized Gifts & E-Commerce Storefront",
    tools: "React, Node.js, Custom Product Configurator, E-Commerce Checkout, Vercel",
    image: "/images/anchor-customs.png",
    fallbackImage: "/images/sapphire.png",
    link: "https://anchorcustoms.in",
    caseStudy: {
      challenge:
        "Anchor Customs needed a high-converting online storefront to sell personalized physical gifts—custom magazines, frames, hampers, calendars, scrapbooks, and bouquets—where emotional storytelling and seamless customization drive every purchase.",
      solution:
        "Engineered a fast, mobile-first e-commerce platform (anchorcustoms.in) with curated category showcases, interactive product personalization workflows, smooth cart management, and brand-aligned visual storytelling ('Making people cry — happy tears only').",
      impact:
        "Established a flagship production domain that streamlined custom order intake, elevated brand trust, and turned social media traffic into direct online sales.",
    },
  },
  {
    title: "Sahu Photography",
    domain: "sahu-creations.vercel.app",
    clientType: "Freelance Client • Luxury Wedding Studio",
    category: "Royal Wedding Photography & Cinematic Films Portfolio",
    tools: "React, Responsive Media Gallery, Smooth Animations, Lead Capture, Vercel",
    image: "/images/sahu-photography.png",
    fallbackImage: "/images/Maxlife.png",
    link: "https://sahu-creations.vercel.app",
    caseStudy: {
      challenge:
        "Sahu Creations required a luxury digital portfolio capable of showcasing high-resolution wedding, Haldi, candid, and pre-wedding cinematography without sacrificing page load speed on mobile devices.",
      solution:
        "Designed an editorial, royal-themed visual experience with optimized WebP galleries, categorized event narratives, and direct booking consultation CTAs tailored for couples planning premium weddings.",
      impact:
        "Delivered a fast, cinema-grade showcase that elevates perceived studio value and converts portfolio viewers into pre-wedding and wedding shoot inquiries.",
    },
  },
  {
    title: "Eternity Hostel KP3",
    domain: "eternity-hostel-6otk.vercel.app",
    clientType: "Freelance Client • Student Hospitality & CRM",
    category: "Luxury Hostel Booking Platform + Automated Google Sheets Backend",
    tools: "React, Google Sheets CRM Automation, Real-Time Lead Sync, Responsive UI",
    image: "/images/eternity-hostel.png",
    fallbackImage: "/images/Solidx.png",
    link: "https://eternity-hostel-6otk.vercel.app",
    secondaryLink: {
      label: "Live Booking Sheet (CRM)",
      url: "https://docs.google.com/spreadsheets/d/1PlM2-3EQdZnPcLNfa9B6XAk899IeGmq6fsa4oMZ9Dsk/edit?usp=sharing",
    },
    caseStudy: {
      challenge:
        "Located in Knowledge Park 3 (KP3), Greater Noida, Eternity Hostel needed both a modern room-discovery website for students/parents and a zero-maintenance backend for staff to track room inquiries in real time.",
      solution:
        "Built a luxury hostel booking portal showcasing AC/Non-AC multi-seater rooms and amenities, directly integrated with an automated Google Sheets CRM pipeline so every student booking submission is logged instantaneously.",
      impact:
        "Eliminated manual lead tracking for hostel management by syncing website inquiries straight into a live shared spreadsheet accessible on any device.",
    },
  },
  {
    title: "Wellship Clinic",
    domain: "wellship-clinic.vercel.app",
    clientType: "Freelance Client • Multi-City Healthcare",
    category: "Doctor-Supervised Aesthetic & Wellness Clinic Platform",
    tools: "React, Healthcare UX, Consultation Funnel, Multi-Location SEO, Vercel",
    image: "/images/wellship-clinic.png",
    fallbackImage: "/images/bond.png",
    link: "https://wellship-clinic.vercel.app",
    caseStudy: {
      challenge:
        "Wellship Clinic (operating across Delhi NCR & Ludhiana) needed a trustworthy, medically authoritative web presence to educate patients on advanced aesthetic and wellness programs and drive free consultation bookings.",
      solution:
        "Architected a clean, patient-first digital clinic featuring treatment breakdowns, doctor-supervised care highlights, location targeting for Delhi NCR and Ludhiana, and frictionless consultation scheduling.",
      impact:
        "Improved patient trust and simplified multi-city appointment acquisition through clear clinical positioning and high-visibility booking funnels.",
    },
  },
  {
    title: "Dr. Prakhar Shrivastava",
    domain: "dr-prakhar.vercel.app",
    clientType: "Freelance Client • Medical Personal Brand",
    category: "Clinical Dental Specialist Portfolio & Authority Hub",
    tools: "React, Personal Branding UI, LinkedIn Integration, Appointment CTA",
    image: "/images/dr-prakhar.png",
    fallbackImage: "/images/radix.png",
    link: "https://dr-prakhar.vercel.app",
    caseStudy: {
      challenge:
        "As a Clinical Dental Specialist, Dr. Prakhar Shrivastava needed a dedicated professional hub linked with his LinkedIn presence to showcase clinical credentials, certifications, and patient care philosophy.",
      solution:
        "Crafted a refined medical specialist portfolio highlighting clinical specializations, verified qualifications, patient testimonials, and direct LinkedIn & consultation connect pathways.",
      impact:
        "Strengthened professional authority online and provided patients and peers with a credible, single-click destination from LinkedIn.",
    },
  },
  {
    title: "MedN Riders",
    domain: "medn-riders.vercel.app",
    clientType: "Freelance Client • Automotive & Custom Mods",
    category: "Custom Motorcycle Modification & Visual Concept Platform",
    tools: "React, Photo Upload Workflow, Custom Automotive UI, Interactive Showcase",
    image: "/images/medn-riders.png",
    fallbackImage: "/images/callhq.png",
    link: "https://medn-riders.vercel.app",
    caseStudy: {
      challenge:
        "Motorcycle enthusiasts struggle to visualize how custom body kits, wraps, and performance aesthetics will look on their own bike before committing to a build.",
      solution:
        "Developed MedN Riders with a bold, high-contrast automotive aesthetic where riders can explore custom bike builds and upload a photo of their motorcycle to request tailored modification concepts.",
      impact:
        "Created an engaging interactive lead magnet for custom bike builders that turns rider curiosity into qualified modification requests.",
    },
  },
  {
    title: "Manjeet Saini Hospital",
    domain: "msh-vanilla-booking.vercel.app",
    clientType: "Freelance Client • Hospital Booking System",
    category: "Patient Appointment & Department Scheduling Portal",
    tools: "HTML5, CSS3, Vanilla JavaScript, Fast Mobile Booking Flow, Vercel",
    image: "/images/manjeet-hospital.png",
    fallbackImage: "/images/broki.png",
    link: "https://msh-vanilla-booking.vercel.app",
    caseStudy: {
      challenge:
        "Patients visiting Manjeet Saini Hospital needed a lightweight, zero-lag appointment booking system that loads instantly even on slow mobile networks.",
      solution:
        "Engineered a streamlined, dependency-free Vanilla JS hospital booking application enabling patients to select departments, choose doctors, and book appointment slots in seconds.",
      impact:
        "Delivered near-instant load times on mobile devices and simplified front-desk patient scheduling.",
    },
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    touchStartX.current = null;
  };

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <div className="work-header">
          <h2>
            Client <span>Work</span> &amp; Case Studies
          </h2>
          <p className="work-subtitle">
            Real-world websites, e-commerce stores, healthcare portals, and automated booking systems delivered for freelance clients.
          </p>
        </div>

        {/* Quick Project Selector Pills */}
        <div className="project-selector" role="tablist" aria-label="Client projects">
          {projects.map((project, index) => (
            <button
              key={project.title}
              className={`project-pill ${
                index === currentIndex ? "project-pill-active" : ""
              }`}
              onClick={() => goToSlide(index)}
              data-cursor="disable"
            >
              <span className="project-pill-num">0{index + 1}</span>
              {project.title}
            </button>
          ))}
        </div>

        <div className="carousel-wrapper">
          {/* Navigation Arrows */}
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          {/* Slides */}
          <div
            className="carousel-track-container"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {projects.map((project, index) => (
                <div className="carousel-slide" key={project.title}>
                  <div className="carousel-content">
                    {/* Website Preview Photo ABOVE Project Name */}
                    <div className="carousel-image-wrapper">
                      <div className="browser-mockup">
                        <div className="browser-mockup-bar">
                          <div className="browser-dots">
                            <span className="browser-dot dot-red" />
                            <span className="browser-dot dot-yellow" />
                            <span className="browser-dot dot-green" />
                          </div>
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            className="browser-url"
                            data-cursor="disable"
                          >
                            https://{project.domain} <MdArrowOutward />
                          </a>
                        </div>
                        <WorkImage
                          image={project.image}
                          fallbackImage={project.fallbackImage}
                          alt={`${project.title} website preview`}
                          link={project.link}
                        />
                      </div>
                    </div>

                    {/* Project Name, Case Study & Links Below Photo */}
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>
                      <div className="carousel-details">
                        <span className="client-badge">{project.clientType}</span>
                        <h4>{project.title}</h4>
                        <p className="carousel-category">{project.category}</p>

                        {/* Case Study Breakdown */}
                        <div className="case-study-box">
                          <div className="case-study-item">
                            <span className="case-study-label">The Challenge</span>
                            <p>{project.caseStudy.challenge}</p>
                          </div>
                          <div className="case-study-item">
                            <span className="case-study-label">The Solution</span>
                            <p>{project.caseStudy.solution}</p>
                          </div>
                          <div className="case-study-item">
                            <span className="case-study-label">Client Impact</span>
                            <p>{project.caseStudy.impact}</p>
                          </div>
                        </div>

                        <div className="carousel-tools">
                          <span className="tools-label">Tech Stack &amp; Deliverables</span>
                          <p>{project.tools}</p>
                        </div>

                        {/* Live Links */}
                        <div className="project-actions">
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            className="project-btn project-btn-primary"
                            data-cursor="disable"
                          >
                            Visit Live Website <MdArrowOutward />
                          </a>
                          {project.secondaryLink && (
                            <a
                              href={project.secondaryLink.url}
                              target="_blank"
                              rel="noreferrer"
                              className="project-btn project-btn-secondary"
                              data-cursor="disable"
                            >
                              {project.secondaryLink.label} <MdArrowOutward />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="carousel-dots">
            {projects.map((project, index) => (
              <button
                key={project.title}
                className={`carousel-dot ${
                  index === currentIndex ? "carousel-dot-active" : ""
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to ${project.title}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
