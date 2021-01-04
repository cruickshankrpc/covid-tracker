// THIS SORTS DATA FROM HIGHEST 

export const sortData = (data) => {
  const sortedData = [...data];

  // SORT is powerful ES6 function
  // TERNARY -> -1 = false, 1 = true
  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
}