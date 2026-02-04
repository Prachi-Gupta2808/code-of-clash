"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const bars = [
  {
    side: "left",
    y: -200,
    color: "bg-white text-black",
    text: "Best site to improve coding speed and logic!",
  },
  {
    side: "right",
    y: -120,
    color: "bg-[#F2613F] text-white",
    text: "Perfect platform to compete with friends and learn!",
  },
  {
    side: "left",
    y: -40,
    color: "bg-white text-black",
    text: "Challenges are fun, engaging, and well-designed.",
  },
  {
    side: "right",
    y: 40,
    color: "bg-[#F2613F] text-white",
    text: "I improved my problem-solving skills dramatically!",
  },
  {
    side: "left",
    y: 120,
    color: "bg-white text-black",
    text: "Interactive interface makes learning enjoyable.",
  },
  {
    side: "right",
    y: 200,
    color: "bg-[#F2613F] text-white",
    text: "A must-use platform for anyone serious about coding!",
  },
];

const ScrollReview = ({ scrollRef }) => {
  const sectionRef = useRef(null);
  const barsRef = useRef([]);

  useEffect(() => {
    if (!scrollRef?.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          scroller: scrollRef.current,
          start: "top top",
          end: () => `+=${sectionRef.current.offsetHeight * 2}`, // dynamic scroll distance
          scrub: true,
          pin: true,
        },
      });

      barsRef.current.forEach((bar, i) => {
        if (!bar) return;

        const barWidth = bar.offsetWidth;
        const fromX =
          bars[i].side === "left"
            ? -barWidth - Math.random() * 50
            : window.innerWidth + Math.random() * 50;
        const toX =
          bars[i].side === "left"
            ? window.innerWidth + Math.random() * 50
            : -barWidth - Math.random() * 50;

        tl.fromTo(bar, { x: fromX }, { x: toX, ease: "none" }, 0);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [scrollRef]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-visible"
    >
      {bars.map((bar, i) => {
        const rotate = (Math.random() - 0.5) * 4; // -2 to +2 deg
        const verticalOffset = (Math.random() - 0.5) * 20; // -10 to +10px
        const spacing = 150; // spacing between bars

        return (
          <div
            key={i}
            ref={(el) => (barsRef.current[i] = el)}
            style={{
              top: `calc(50% + ${i * spacing + bar.y + verticalOffset}px)`,
              rotate: `${rotate}deg`,
            }}
            className={`absolute
              h-[120px] 
              px-6
              flex items-center
              text-[100px] font-semibold
              shadow-[0_20px_60px_rgba(0,0,0,0.45)]
              ${bar.color}
              whitespace-nowrap
            `}
          >
            {bar.text}
          </div>
        );
      })}
    </section>
  );
};

export default ScrollReview;
