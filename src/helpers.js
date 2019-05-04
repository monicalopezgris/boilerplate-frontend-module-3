
export function getNewRef(ref) {
  const num = Number(ref.slice(-2)) + 1;
  let newRef = ref.slice(0, ref.length - 2);
  newRef += num;
  return newRef;
}

export function calcPrice(units, unitPrice) {
  return units * unitPrice;
}
