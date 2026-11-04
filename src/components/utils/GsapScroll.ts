import * as THREE from "three";
import gsap from "gsap";

export function getMaskStops(zoom: number, camY = 13.1, camZ = 24.7) {
  const halfH = (camZ * Math.tan((14.5 * Math.PI) / 360)) / zoom;
  const stop1 = Math.min(90, Math.round(50 + ((camY - 11.4) / halfH) * 50));
  const stop2 = Math.min(100, Math.round(50 + ((camY - 10.3) / halfH) * 50));
  return { stop1: `${stop1}%`, stop2: `${stop2}%` };
}

export function setCharTimeline(
  character: THREE.Object3D<THREE.Object3DEventMap> | null,
  camera: THREE.PerspectiveCamera
) {
  let intensity: number = 0;
  setInterval(() => {
    intensity = Math.random();
  }, 200);

  let screenLight: any, monitor: any;
  character?.children.forEach((object: any) => {
    if (object.name === "Plane004") {
      object.children.forEach((child: any) => {
        child.material.transparent = true;
        child.material.opacity = 0;
        if (child.material.name === "Material.018") {
          monitor = child;
          child.material.color.set("#FFFFFF");
        }
      });
    }
    if (object.name === "screenlight") {
      object.material.transparent = true;
      object.material.opacity = 0;
      object.material.emissive.set("#B0F5EA");
      gsap.timeline({ repeat: -1, repeatRefresh: true }).to(object.material, {
        emissiveIntensity: () => intensity * 8,
        duration: () => Math.random() * 0.6,
        delay: () => Math.random() * 0.1,
      });
      screenLight = object;
    }
  });
  let neckBone = character?.getObjectByName("spine005");

  if (character) {
    const isMobile = window.innerWidth <= 1024;
    const { stop1, stop2 } = getMaskStops(camera.zoom, 13.1, 24.7);

    // On mobile, camY = 10.3 places the character's chest at 50% height (top half of screen),
    // leaving the bottom 50% completely open for the About Me card.
    const tl1CamY = isMobile ? 10.3 : 13.1;
    const tl1CamZ = isMobile ? 28 : 22;
    const tl1CharX = isMobile ? "0%" : "-25%";
    const { stop1: tl1Stop1, stop2: tl1Stop2 } = getMaskStops(
      camera.zoom,
      tl1CamY,
      tl1CamZ
    );

    // On mobile, camY = 2.8, camZ = 98 places the character's feet/desk bottom at ~48% height,
    // keeping the entire 3D character + monitor between the top title and bottom cards.
    const tl2CamZ = isMobile ? 98 : 75;
    const tl2CamY = isMobile ? 2.8 : 8.4;
    const tl2CharX = isMobile ? "0%" : "-12%";

    // Reset base state before constructing scroll timelines so resize at any scroll position is clean
    camera.position.set(0, 13.1, 24.7);
    character.rotation.set(0, 0, 0);
    if (neckBone) neckBone.rotation.x = 0;
    if (monitor) {
      monitor.material.opacity = 0;
      monitor.position.set(0, -10, 2);
    }
    if (screenLight) {
      screenLight.material.opacity = 0;
    }
    gsap.set(".character-model", {
      x: "0%",
      y: "0%",
      "--charMaskStop1": stop1,
      "--charMaskStop2": stop2,
    });
    gsap.set(".landing-container", { opacity: 1, y: "0%" });
    gsap.set(".about-me", { y: "0%" });
    gsap.set(".about-section", { y: "0%", opacity: 1 });
    gsap.set(".whatIDO", { y: "0%" });
    gsap.set(".what-box-in", { display: "none" });

    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: ".landing-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".about-section",
        start: "center 55%",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
    const tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: ".whatIDO",
        start: "top top",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    tl1
      .fromTo(
        character.rotation,
        { y: 0 },
        { y: 0.7, duration: 1, immediateRender: false },
        0
      )
      .fromTo(
        camera.position,
        { z: 24.7, y: 13.1 },
        { z: tl1CamZ, y: tl1CamY, duration: 1, immediateRender: false },
        0
      )
      .fromTo(
        ".character-model",
        {
          x: "0%",
          "--charMaskStop1": stop1,
          "--charMaskStop2": stop2,
        },
        {
          x: tl1CharX,
          "--charMaskStop1": tl1Stop1,
          "--charMaskStop2": tl1Stop2,
          duration: 1,
          immediateRender: false,
        },
        0
      )
      .fromTo(
        ".landing-container",
        { opacity: 1, y: "0%" },
        { opacity: 0, y: "40%", duration: 0.8, immediateRender: false },
        0
      )
      .fromTo(
        ".about-me",
        { y: isMobile ? "20%" : "-50%" },
        { y: "0%", duration: 1, immediateRender: false },
        0
      );

    tl2
      .fromTo(
        camera.position,
        { z: tl1CamZ, y: tl1CamY },
        {
          z: tl2CamZ,
          y: tl2CamY,
          duration: 6,
          delay: 2,
          ease: "power3.inOut",
          immediateRender: false,
        },
        0
      )
      .fromTo(
        ".about-section",
        { y: "0%" },
        {
          y: isMobile ? "-15%" : "30%",
          duration: 6,
          immediateRender: false,
        },
        0
      )
      .fromTo(
        ".about-section",
        { opacity: 1 },
        {
          opacity: 0,
          delay: isMobile ? 0 : 3,
          duration: isMobile ? 2 : 2,
          immediateRender: false,
        },
        0
      )
      .fromTo(
        ".character-model",
        {
          pointerEvents: "inherit",
          x: tl1CharX,
          "--charMaskStop1": tl1Stop1,
          "--charMaskStop2": tl1Stop2,
        },
        {
          pointerEvents: "none",
          x: tl2CharX,
          "--charMaskStop1": "100%",
          "--charMaskStop2": "100%",
          delay: 2,
          duration: 5,
          immediateRender: false,
        },
        0
      )
      .fromTo(
        character.rotation,
        { y: 0.7, x: 0 },
        { y: 0.92, x: 0.12, delay: 3, duration: 3, immediateRender: false },
        0
      )
      .fromTo(
        neckBone!.rotation,
        { x: 0 },
        { x: 0.6, delay: 2, duration: 3, immediateRender: false },
        0
      )
      .fromTo(
        monitor.material,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, delay: 3.2, immediateRender: false },
        0
      )
      .fromTo(
        screenLight.material,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, delay: 4.5, immediateRender: false },
        0
      )
      .fromTo(
        ".what-box-in",
        { display: "none" },
        { display: "flex", duration: 0.1, delay: 6, immediateRender: false },
        0
      )
      .fromTo(
        monitor.position,
        { y: -10, z: 2 },
        { y: 0, z: 0, delay: 1.5, duration: 3, immediateRender: false },
        0
      )
      .fromTo(
        ".character-rim",
        { opacity: 1, scaleX: 1.4 },
        {
          opacity: 0,
          scale: 0,
          y: "-70%",
          duration: 5,
          delay: 2,
          immediateRender: false,
        },
        0.3
      );

    tl3
      .fromTo(
        ".character-model",
        { y: "0%" },
        {
          y: "-100%",
          duration: 4,
          ease: "none",
          delay: 1,
          immediateRender: false,
        },
        0
      )
      .fromTo(
        ".whatIDO",
        { y: "0%" },
        { y: isMobile ? "8%" : "15%", duration: 2, immediateRender: false },
        0
      )
      .fromTo(
        character.rotation,
        { x: 0.12 },
        { x: -0.04, duration: 2, delay: 1, immediateRender: false },
        0
      );
  }
}

export function setAllTimeline() {
  const careerTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".career-section",
      start: "top 30%",
      end: "100% center",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  careerTimeline
    .fromTo(
      ".career-timeline",
      { maxHeight: "10%" },
      { maxHeight: "100%", duration: 0.5 },
      0
    )

    .fromTo(
      ".career-timeline",
      { opacity: 0 },
      { opacity: 1, duration: 0.1 },
      0
    )
    .fromTo(
      ".career-info-box",
      { opacity: 0 },
      { opacity: 1, stagger: 0.1, duration: 0.5 },
      0
    )
    .fromTo(
      ".career-dot",
      { animationIterationCount: "infinite" },
      {
        animationIterationCount: "1",
        delay: 0.3,
        duration: 0.1,
      },
      0
    )
    .fromTo(
      ".career-section",
      { y: 0 },
      { y: "20%", duration: 0.5, delay: 0.2 },
      0
    );
}
