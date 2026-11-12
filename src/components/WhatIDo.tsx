import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };
  useEffect(() => {
    const handlers: Array<{ el: HTMLDivElement; fn: () => void }> = [];
    if (ScrollTrigger.isTouch || window.innerWidth <= 1024) {
      containerRef.current.forEach((container, index) => {
        if (container) {
          container.classList.remove("what-noTouch");
          if (index === 0) {
            container.classList.add("what-content-active");
          } else {
            container.classList.add("what-sibling");
          }
          const fn = () => handleClick(container);
          container.addEventListener("click", fn);
          handlers.push({ el: container, fn });
        }
      });
    }
    return () => {
      handlers.forEach(({ el, fn }) => {
        el.removeEventListener("click", fn);
      });
    };
  }, []);
  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 0)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>FREELANCE WEB &amp; E-COMMERCE</h3>
              <h4>High-Converting Websites for Brands &amp; Clinics</h4>
              <p>
                I design and build custom e-commerce stores, clinic/hospital booking portals, luxury portfolios, and brand websites that load fast and convert visitors into customers.
              </p>
              <h5>Services &amp; Stack</h5>
              <div className="what-content-flex">
                <div className="what-tags">Custom E-Commerce</div>
                <div className="what-tags">React &amp; Next.js</div>
                <div className="what-tags">Clinic &amp; Hospital Portals</div>
                <div className="what-tags">Luxury Portfolios</div>
                <div className="what-tags">Mobile-First UI/UX</div>
                <div className="what-tags">Custom Domains &amp; SEO</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 1)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>AI, BOOKING &amp; AUTOMATION</h3>
              <h4>Smart Backend Systems &amp; Live CRM Pipelines</h4>
              <p>
                From real-time Google Sheets booking CRMs to full-stack Node.js/MongoDB backends and AI-powered workflows, I automate lead capture and operations so businesses scale effortlessly.
              </p>
              <h5>Skillset &amp; Tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">Node.js &amp; Express</div>
                <div className="what-tags">Google Sheets CRM Sync</div>
                <div className="what-tags">Booking Engines</div>
                <div className="what-tags">Python &amp; AI/ML</div>
                <div className="what-tags">MongoDB &amp; SQL</div>
                <div className="what-tags">Vercel Cloud</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);

    siblings.forEach((sibling) => {
      if (sibling !== container && sibling.classList.contains("what-content")) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
