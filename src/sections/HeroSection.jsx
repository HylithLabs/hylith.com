import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const HeroSection = () => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const bubbleRef = useRef(null);
  const titleRef = useRef(null);
  const controlsRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);



  /* ── Hover mute bubble — follows cursor over the video ── */
  useEffect(() => {
    const bubble = bubbleRef.current;
    const hero = playerRef.current;
    const title = titleRef.current;
    const controls = controlsRef.current;
    if (!bubble || !hero) return;

    const xTo = gsap.quickTo(bubble, "x", {
      duration: 0.5,
      ease: "power3",
    });
    const yTo = gsap.quickTo(bubble, "y", {
      duration: 0.5,
      ease: "power3",
    });

    const onMove = (e) => {
      xTo(e.clientX + 13);
      yTo(e.clientY - 43);
    };

    const onEnter = () => {
      gsap.killTweensOf(bubble, "opacity,scale,rotation");
      gsap.to(bubble, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.7,
        delay: 0.05,
        ease: "elastic.out(1, 0.4)",
      });
    };

    const onLeave = () => {
      gsap.killTweensOf(bubble, "opacity,scale,rotation");
      gsap.to(bubble, {
        opacity: 0,
        scale: 0,
        rotation: -30,
        duration: 0.3,
        ease: "sine.inOut",
      });
    };

    const hideBubble = () => {
      gsap.killTweensOf(bubble, "opacity,scale,rotation");
      gsap.to(bubble, {
        opacity: 0,
        scale: 0,
        rotation: -30,
        duration: 0.3,
        ease: "sine.inOut",
      });
    };

    const showBubble = () => {
      gsap.killTweensOf(bubble, "opacity,scale,rotation");
      gsap.to(bubble, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: "sine.inOut",
      });
    };

    const onTitleEnter = () => {
      hideBubble();
      if (controls)
        gsap.to(controls, { opacity: 0, duration: 0.3, pointerEvents: "none" });
    };

    const onTitleLeave = () => {
      showBubble();
      if (controls)
        gsap.to(controls, { opacity: 1, duration: 0.3, pointerEvents: "auto" });
    };

    window.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseenter", onEnter);
    hero.addEventListener("mouseleave", onLeave);

    if (title) {
      title.addEventListener("mouseenter", onTitleEnter);
      title.addEventListener("mouseleave", onTitleLeave);
    }
    if (controls) {
      controls.addEventListener("mouseenter", hideBubble);
      controls.addEventListener("mouseleave", showBubble);
    }

    return () => {
      window.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseenter", onEnter);
      hero.removeEventListener("mouseleave", onLeave);

      if (title) {
        title.removeEventListener("mouseenter", onTitleEnter);
        title.removeEventListener("mouseleave", onTitleLeave);
      }
      if (controls) {
        controls.removeEventListener("mouseenter", hideBubble);
        controls.removeEventListener("mouseleave", showBubble);
      }
    };
  }, []);

  /* ── Controls ── */
  const togglePlay = (e) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying((p) => !p);
  };

  const toggleMute = (e) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted((m) => !m);
  };

  const toggleFullscreen = (e) => {
    if (e) e.stopPropagation();
    if (!document.fullscreenElement) {
      playerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <section className="bg-main-bg">
      {/* Hover mute bubble — follows cursor over the video */}
      <div
        ref={bubbleRef}
        className={`vimeo-mute-bubble`}
        style={{ pointerEvents: "none" }}
      >
        <div className="vimeo-mute-bubble__blob">
          <img
            src="/assets/VimeoHero SVG/mute-bubble-blob.svg"
            alt=""
            className="vimeo-mute-bubble__blob-svg"
          />
          <div className="vimeo-mute-bubble__icon">
            {isPlaying ? (
              <svg viewBox="0 0 24 24" fill="none" style={{ width: "24px", height: "24px" }}>
                <path
                  d="M5.5 5.125H8.5C8.70711 5.125 8.875 5.29289 8.875 5.5V18.5C8.875 18.7071 8.70711 18.875 8.5 18.875H5.5C5.29289 18.875 5.125 18.7071 5.125 18.5V5.5C5.125 5.29289 5.29289 5.125 5.5 5.125Z"
                  fill="currentColor"
                />
                <path
                  d="M15.5 5.125H18.5C18.7071 5.125 18.875 5.29289 18.875 5.5V18.5C18.875 18.7071 18.7071 18.875 18.5 18.875H15.5C15.2929 18.875 15.125 18.7071 15.125 18.5V5.5C15.125 5.29289 15.2929 5.125 15.5 5.125Z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" style={{ width: "24px", height: "24px", marginLeft: "4px" }}>
                <path
                  d="M6 12V5.20128C6 4.37664 6.89256 3.86113 7.60685 4.27322L19.3914 11.072C20.1061 11.4843 20.1061 12.5158 19.3914 12.9281L7.60685 19.7269C6.89256 20.139 6 19.6234 6 18.7988V12Z"
                  fill="currentColor"
                />
              </svg>
            )}
          </div>
        </div>
      </div>

      {/* Main hero container */}
      <div
        className={`vimeo-hero ${isPlaying ? "is-playing" : "is-paused"} ${isMuted ? "is-muted" : "is-unmuted"}`}
        ref={playerRef}
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          src="/videos/hero-bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="vimeo-hero__iframe"
          style={{ objectFit: "cover", backgroundColor: "#111" }}
        />

        {/* Gradient fade */}
        <div className="vimeo-hero__fade" />

        {/* Headline — bottom left, word-by-word layout */}
        <div className="home-header__title">
          <h1
            className="vimeo-hero__title"
            ref={titleRef}
            onClick={(e) => e.stopPropagation()}
          >
            {/* "we" */}
            <span className="vimeo-hero__word">We </span>

            {/* "make" + smiley */}
            <span className="vimeo-hero__word is--relative">
              <span>build </span>
              <div className="home-header__smiley">
                <img
                  src="/assets/VimeoHero SVG/smiley-face.svg"
                  alt=""
                  className="home-header__smiley-svg"
                />
              </div>
            </span>

            {/* "advertising" italic */}
            <span className="vimeo-hero__word">
              <em>full-stack systems </em>
            </span>

            {/* "for" */}
            <span className="vimeo-hero__word">for </span>

            <div style={{ flexBasis: "100%", height: 0 }} />

            <span className="vimeo-hero__word">the </span>
            <span className="vimeo-hero__word">new </span>

            {/* "mainstream" + pink star + oval underline */}
            <span className="vimeo-hero__word is--relative">
              <div className="home-header__star">
                <div className="home-header__star-inner">
                  <img
                    src="/assets/VimeoHero SVG/pink-star.svg"
                    alt=""
                    className="home-header__star-svg"
                  />
                </div>
              </div>
              {/* Oval underline */}
              <img
                src="/assets/VimeoHero SVG/oval-underline.svg"
                alt=""
                className="home-header__title-line-svg"
              />
              <span>mainstream</span>
            </span>
          </h1>
        </div>

        {/* Controls — bottom LEFT: pause/play + fullscreen */}
        <div
          className="vimeo-hero__controls"
          ref={controlsRef}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Play / Pause */}
          <button
            className="vimeo-hero__btn"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M5.5 5.125H8.5C8.70711 5.125 8.875 5.29289 8.875 5.5V18.5C8.875 18.7071 8.70711 18.875 8.5 18.875H5.5C5.29289 18.875 5.125 18.7071 5.125 18.5V5.5C5.125 5.29289 5.29289 5.125 5.5 5.125Z"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeMiterlimit="10"
                />
                <path
                  d="M15.5 5.125H18.5C18.7071 5.125 18.875 5.29289 18.875 5.5V18.5C18.875 18.7071 18.7071 18.875 18.5 18.875H15.5C15.2929 18.875 15.125 18.7071 15.125 18.5V5.5C15.125 5.29289 15.2929 5.125 15.5 5.125Z"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeMiterlimit="10"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 12V5.20128C6 4.37664 6.89256 3.86113 7.60685 4.27322L19.3914 11.072C20.1061 11.4843 20.1061 12.5158 19.3914 12.9281L7.60685 19.7269C6.89256 20.139 6 19.6234 6 18.7988V12Z"
                  stroke="currentColor"
                  strokeWidth="1.33929"
                  strokeMiterlimit="10"
                />
              </svg>
            )}
          </button>

          {/* Fullscreen */}
          <button
            className="vimeo-hero__btn"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
          >
            {!isFullscreen ? (
              <svg viewBox="0 0 20 20" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.5 3.95833C2.5 3.15292 3.15292 2.5 3.95833 2.5H6.875C7.22017 2.5 7.5 2.77983 7.5 3.125C7.5 3.47017 7.22017 3.75 6.875 3.75H3.95833C3.84327 3.75 3.75 3.84327 3.75 3.95833V6.875C3.75 7.22017 3.47017 7.5 3.125 7.5C2.77983 7.5 2.5 7.22017 2.5 6.875V3.95833ZM12.5 3.125C12.5 2.77983 12.7798 2.5 13.125 2.5H16.0417C16.8471 2.5 17.5 3.15292 17.5 3.95833V6.875C17.5 7.22017 17.2202 7.5 16.875 7.5C16.5298 7.5 16.25 7.22017 16.25 6.875V3.95833C16.25 3.84327 16.1567 3.75 16.0417 3.75H13.125C12.7798 3.75 12.5 3.47017 12.5 3.125ZM3.125 12.5C3.47017 12.5 3.75 12.7798 3.75 13.125V16.0417C3.75 16.1567 3.84327 16.25 3.95833 16.25H6.875C7.22017 16.25 7.5 16.5298 7.5 16.875C7.5 17.2202 7.22017 17.5 6.875 17.5H3.95833C3.15292 17.5 2.5 16.8471 2.5 16.0417V13.125C2.5 12.7798 2.77983 12.5 3.125 12.5ZM16.875 12.5C17.2202 12.5 17.5 12.7798 17.5 13.125V16.0417C17.5 16.8471 16.8471 17.5 16.0417 17.5H13.125C12.7798 17.5 12.5 17.2202 12.5 16.875C12.5 16.5298 12.7798 16.25 13.125 16.25H16.0417C16.1567 16.25 16.25 16.1567 16.25 16.0417V13.125C16.25 12.7798 16.5298 12.5 16.875 12.5Z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 20 20" fill="none">
                <path
                  d="M6.04167 7.5C6.84708 7.5 7.5 6.84708 7.5 6.04167L7.5 3.125C7.5 2.77983 7.22017 2.5 6.875 2.5C6.52982 2.5 6.25 2.77983 6.25 3.125L6.25 6.04167C6.25 6.15673 6.15672 6.25 6.04167 6.25L3.125 6.25C2.77983 6.25 2.5 6.52983 2.5 6.875C2.5 7.22018 2.77983 7.5 3.125 7.5L6.04167 7.5Z"
                  fill="currentColor"
                />
                <path
                  d="M16.875 7.5C17.2202 7.5 17.5 7.22017 17.5 6.875C17.5 6.52982 17.2202 6.25 16.875 6.25L13.9583 6.25C13.8433 6.25 13.75 6.15673 13.75 6.04167L13.75 3.125C13.75 2.77983 13.4702 2.5 13.125 2.5C12.7798 2.5 12.5 2.77983 12.5 3.125L12.5 6.04167C12.5 6.84708 13.1529 7.5 13.9583 7.5L16.875 7.5Z"
                  fill="currentColor"
                />
                <path
                  d="M12.5 16.875C12.5 17.2202 12.7798 17.5 13.125 17.5C13.4702 17.5 13.75 17.2202 13.75 16.875L13.75 13.9583C13.75 13.8433 13.8433 13.75 13.9583 13.75L16.875 13.75C17.2202 13.75 17.5 13.4702 17.5 13.125C17.5 12.7798 17.2202 12.5 16.875 12.5L13.9583 12.5C13.1529 12.5 12.5 13.1529 12.5 13.9583L12.5 16.875Z"
                  fill="currentColor"
                />
                <path
                  d="M6.25 16.875C6.25 17.2202 6.52982 17.5 6.875 17.5C7.22017 17.5 7.5 17.2202 7.5 16.875L7.5 13.9583C7.5 13.1529 6.84708 12.5 6.04167 12.5L3.125 12.5C2.77982 12.5 2.5 12.7798 2.5 13.125C2.5 13.4702 2.77982 13.75 3.125 13.75L6.04167 13.75C6.15672 13.75 6.25 13.8433 6.25 13.9583L6.25 16.875Z"
                  fill="currentColor"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
