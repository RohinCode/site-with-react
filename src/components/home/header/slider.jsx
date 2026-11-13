import { useState, useEffect } from "react";

function Slider() {
  const [slideIndex, setSlideIndex] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 490);

  function changeImage(index) {
    setSlideIndex(index);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev === 6 ? 1 : prev + 1));
    }, 4000);

    function checkWidth() {
      setIsMobile(window.innerWidth <= 490);
    }

    window.addEventListener("resize", checkWidth);

    return () => {
      clearInterval(timer);
      window.removeEventListener("resize", checkWidth);
    };
  }, []);

  return (
    <section className="slider">
      <div className="slides">
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <div
            key={index}
            className={`item ${slideIndex === index ? "show-it" : ""}`}
            id={`slide${index}`}
          >
            <img
              src={
                isMobile
                  ? `/images/header[2]${index}.webp`
                  : `/images/header${index}.webp`
              }
              loading={index === 1 ? "eager" : "lazy"}
              fetchPriority={index === 1 ? "high" : "auto"}
            />
          </div>
        ))}
      </div>

      <div className="button">
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <i
            key={index}
            onClick={() => changeImage(index)}
            className={`fas fa-circle ${slideIndex === index ? "active" : ""}`}
          />
        ))}
      </div>
    </section>
  );
}

export default Slider;
