import React from 'react';

const YearSelector = ({ type, setSearchParams, refetch }) => {
  const currentYear = new Date().getFullYear();
  // Tạo một mảng chứa các năm từ hiện tại đến năm 1990
  const years = [];
  for (let year = currentYear; year >= 1990; year--) {
    years.push(year);
  }
  const handleChangeYear = (year) => {
    refetch();
    setSearchParams(`?year=${year}`);
  };
  return (
    <select
      name='year'
      id='year'
      className='text-black'
      onChange={(e) => handleChangeYear(e.target.value)}
    >
      <option>--Chọn năm--</option>
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
};

export default YearSelector;
