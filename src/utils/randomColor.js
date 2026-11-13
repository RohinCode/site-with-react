export default function randomColor(id) {
  const colors = [
    "#2e56ad",
    "#d32222",
    "#141414",
    "#f7c326",
    "#ee5da6",
    "#1dd762",
    "#f4712a",
  ];

  let hash = 0;

  for (let i = 0; i < String(id).length; i++) {
    hash = String(id).charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
}
