import { useEffect } from "react";
import { gsap } from "gsap";
import "../navbar.css";

const NavBar = () => {
  useEffect(() => {
    const workBox = document.querySelector(".nav-work-box");
    const workBlob = document.querySelector(".nav-bar__work-blob-svg");
    const navLeft = document.querySelector(".nav-left");

    if (!navLeft || !workBox || !workBlob) return;

    const workInner = workBox.querySelector(".nav-popout-inner");
    const workItems = workInner ? Array.from(workInner.children) : [];

    // Measure to find scale origin relative to blob center
    gsap.set(workBox, { visibility: "visible", scale: 1, opacity: 1 });
    const boxRect = workBox.getBoundingClientRect();
    const blobRect = workBlob.getBoundingClientRect();
    const originX = blobRect.left + blobRect.width / 2 - boxRect.left;
    const originY = blobRect.top + blobRect.height / 2 - boxRect.top;
    const workOrigin = `${originX}px ${originY}px`;

    gsap.set(workBox, {
      visibility: "hidden",
      scale: 0,
      opacity: 0,
      transformOrigin: workOrigin,
    });
    gsap.set(workItems, { y: 10, opacity: 0 });
    gsap.set(workBlob, { transformOrigin: "center center" });

    const onEnter = () => {
      gsap.killTweensOf([workBox, workItems, workBlob]);
      gsap.to(workBlob, { rotation: "+=360", duration: 0.7, ease: "power3.inOut" });
      gsap.set(workBox, { visibility: "visible" });
      gsap.fromTo(
        workBox,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "expo.out" }
      );
      gsap.to(workItems, {
        y: 0,
        opacity: 1,
        duration: 0.45,
        stagger: 0.06,
        ease: "power3.out",
        delay: 0.18,
      });
    };

    const onLeave = () => {
      gsap.killTweensOf([workBox, workItems, workBlob]);
      gsap.to(workBlob, { rotation: 0, duration: 0.5, ease: "power2.out" });
      gsap.to(workItems, { y: 10, opacity: 0, duration: 0.15, ease: "power2.in" });
      gsap.to(workBox, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "expo.in",
        delay: 0.05,
        onComplete: () => gsap.set(workBox, { visibility: "hidden" }),
      });
    };

    navLeft.addEventListener("mouseenter", onEnter);
    navLeft.addEventListener("mouseleave", onLeave);

    // Work item: badge wiggle + image tilt
    const items = document.querySelectorAll(".nav-work-item");
    const itemCleanups = [];
    items.forEach((item) => {
      const badge = item.querySelector(".nav-work-badge");
      const img = item.querySelector(".nav-work-item__img");
      let wiggleTween;

      const onItemEnter = () => {
        if (badge) {
          gsap.set(badge, { transformOrigin: "center center" });
          wiggleTween = gsap.to(badge, {
            rotation: 5,
            duration: 0.15,
            repeat: -1,
            yoyo: true,
            ease: "steps(1)",
          });
        }
        if (img) gsap.to(img, { rotation: 16, scale: 1.15, duration: 0.25, ease: "power2.out" });
      };
      const onItemLeave = () => {
        if (wiggleTween) wiggleTween.kill();
        if (badge) gsap.to(badge, { rotation: 0, duration: 0.3, ease: "power2.out" });
        if (img) gsap.to(img, { rotation: 0, scale: 1, duration: 0.3, ease: "power2.out" });
      };

      item.addEventListener("mouseenter", onItemEnter);
      item.addEventListener("mouseleave", onItemLeave);
      itemCleanups.push(() => {
        item.removeEventListener("mouseenter", onItemEnter);
        item.removeEventListener("mouseleave", onItemLeave);
      });
    });

    return () => {
      navLeft.removeEventListener("mouseenter", onEnter);
      navLeft.removeEventListener("mouseleave", onLeave);
      itemCleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <nav className="navbar">
      {/* ─── Top-left: Work button (from hylith) ─── */}
      <div className="nav-left">
        <div className="nav-hover-trigger">
          <div className="logo-work-container">
            <img
              src="/assets/Navbar SVG/nav-work-blob.svg"
              width="60"
              height="55"
              className="nav-bar__work-blob-svg"
              alt=""
              aria-hidden="true"
            />
            <span className="logo-work-text">work</span>
          </div>

          {/* Pop-out panel */}
          <div className="nav-popout nav-work-box">
            <div className="nav-popout-inner">
              <div className="nav-work-item">
                <div className="nav-work-item__img-wrap">
                  <img
                    src="https://cdn.prod.website-files.com/683703490bc01e1b8c052e06/686b8e614494dac669a4099c_c310914b5a1a573b4c7499e9531f8d52_DE.avif"
                    loading="eager"
                    alt="Campaign 1"
                    className="nav-work-item__img"
                  />
                </div>
                <div className="nav-work-item__text">
                  <span className="nav-work-badge badge-blue">hylith</span>
                  <h4 className="nav-work-title">Open-Source Development</h4>
                </div>
              </div>
              <div className="nav-work-item">
                <div className="nav-work-item__img-wrap">
                  <img
                    src="https://cdn.prod.website-files.com/683703490bc01e1b8c052e06/686b8e607142a7a25157d9dd_1875b9852ca289170917f9060c95b6a4_BolpuntJapie.avif"
                    loading="eager"
                    alt="Product Development"
                    className="nav-work-item__img"
                  />
                </div>
                <div className="nav-work-item__text">
                  <span className="nav-work-badge badge-navy">spylt</span>
                  <h4 className="nav-work-title">Website Development</h4>
                </div>
              </div>
              <div className="nav-work-item">
                <div className="nav-work-item__img-wrap">
                  <img
                    src="https://cdn.prod.website-files.com/683703490bc01e1b8c052e06/686b8e607d351d1335f06e04_f1aafb2150d81c3990c906d901d2e7e4_Esprix.avif"
                    loading="eager"
                    alt="Campaign 3"
                    className="nav-work-item__img"
                  />
                </div>
                <div className="nav-work-item__text">
                  <span className="nav-work-badge badge-blue">brand</span>
                  <h4 className="nav-work-title">brand identity</h4>
                </div>
              </div>
              <a href="http://github.com/hylithLabs/" className="nav-work-btn">
                <span className="nav-work-btn__text">All our work</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
