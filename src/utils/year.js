const now = new Date();

// Lấy năm hiện tại
const currentYear = now.getFullYear();

const yearsArray = [];
for (let year = 2005; year <= currentYear; year++) {
  yearsArray.push(year);
}
export default yearsArray;
