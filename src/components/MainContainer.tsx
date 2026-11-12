import { lazy, PropsWithChildren, Suspense, useEffect, useRef, useState } from "react";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import setSplitText from "./utils/splitText";

const TechStack = lazy(() => import("./TechStack"));

const MainContainer = ({ children }: PropsWithChildren) => {
  const [shouldLoadTechStack, setShouldLoadTechStack] = useState(false);
  const techTriggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  // Defer downloading the heavy 2.4MB Rapier3D TechStack bundle until the user scrolls near Work/TechStack
  useEffect(() => {
    const target = techTriggerRef.current;
    if (!target || shouldLoadTechStack) return;

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            setShouldLoadTechStack(true);
            observer.disconnect();
          }
        },
        { rootMargin: "600px 0px" }
      );
      observer.observe(target);
      return () => observer.disconnect();
    } else {
      const timer = setTimeout(() => setShouldLoadTechStack(true), 4000);
      return () => clearTimeout(timer);
    }
  }, [shouldLoadTechStack]);

  return (
    <div className="container-main">
      <Navbar />
      <SocialIcons />
      {children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing />
            <About />
            <WhatIDo />
            <Career />
            <Work />
            <div ref={techTriggerRef}>
              {shouldLoadTechStack && (
                <Suspense fallback={<div style={{ minHeight: "40vh" }} />}>
                  <TechStack />
                </Suspense>
              )}
            </div>
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
