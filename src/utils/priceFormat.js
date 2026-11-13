function priceToNumber(price) {
  const normalizedPrice = price
    .replace(/[۰-۹]/g, (digit) => "۰۱۲۳۴۵۶۷۸۹".indexOf(digit))
    .replace(/,/g, "")
    .trim();

  const number = parseFloat(normalizedPrice);

  if (normalizedPrice.includes("میلیون")) {
    return number * 1000000;
  }

  if (normalizedPrice.includes("هزار")) {
    return number * 1000;
  }

  return number;
}

export default priceToNumber;
