// compare two array and return shered elements
const getSharedElements = (x, y) => {
  const result = [];
  for (let el of x) {
    if (y.indexOf(el) !== -1) {
      result.push(el);
    }
  }
  return result;
}

export default getSharedElements;