import { useEffect, useState } from "react";

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const scrolled = (scrollTop / docHeight) * 100;
      setProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: "12px", // move slightly inside
        width: "2px",
        height: `${progress}%`,
        backgroundColor: "white",
        zIndex: 9999,
        borderRadius: "2px",
        transition: "height 0.1s linear",
      }}
    />
  );
};

export default ScrollProgress;
