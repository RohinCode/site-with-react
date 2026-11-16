import { useState, useEffect } from "react";

function Slider() {
  const [slideIndex, setSlideIndex] = useState(1);

  function changeImage(index) {
    setSlideIndex(index);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev === 6 ? 1 : prev + 1));
    }, 4000);

    return () => clearInterval(timer);
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
            <picture>
              <source
                media="(max-width: 490px)"
                srcSet={`/images/header[2]${index}.webp`}
                width="1600"
                height="827"
              />

              <img
                src={`/images/header${index}.webp`}
                width="1500"
                height="505"
                loading={index === 1 ? "eager" : "lazy"}
                fetchPriority={index === 1 ? "high" : "auto"}
                alt={`اسلاید ${index}`}
              />
            </picture>
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
