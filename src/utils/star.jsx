function Star({ star = 0 }) {
  return (
    <>
      {Array.from({ length: star }, (_, i) => (
        <i key={i} className="fas fa-star"></i>
      ))}
    </>
  );
}

export default Star;
