function formatMessageDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();

  const dateDay = date.getDate();
  const dateMonth = date.getMonth();
  const dateYear = date.getFullYear();

  const nowDay = now.getDate();
  const nowMonth = now.getMonth();
  const nowYear = now.getFullYear();

  // ساعت و دقیقه
  const time = date.toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // امروز
  if (dateDay === nowDay && dateMonth === nowMonth && dateYear === nowYear) {
    return ` امروز ${time}`;
  }

  // دیروز
  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);

  if (
    dateDay === yesterday.getDate() &&
    dateMonth === yesterday.getMonth() &&
    dateYear === yesterday.getFullYear()
  ) {
    return ` دیروز ${time}`;
  }

  // روزهای قبل
  return (
    date.toLocaleDateString("fa-IR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }) + `، ${time}`
  );
}

export default formatMessageDate;
