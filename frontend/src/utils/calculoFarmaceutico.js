export function calcularGramosRequeridos(dosisStr, cspStr) {
  if (!dosisStr || !cspStr) return 1.0;

  const dm = String(dosisStr).trim().match(/([\d.,]+)\s*([a-zA-Z]+)?/);
  const cm = String(cspStr).trim().match(/([\d.,]+)/);

  const dVal = dm ? parseFloat(dm[1].replace(',', '.')) : 0;
  const u = dm && dm[2] ? dm[2].toLowerCase() : 'mg';

  let dGramos = 0;
  if (u === 'g' || u === 'gr' || u === 'gramos') {
    dGramos = dVal;
  } else if (u === 'mcg' || u === 'ug' || u === 'µg') {
    dGramos = dVal / 1000000;
  } else {
    dGramos = dVal / 1000;
  }

  const cVal = cm ? parseFloat(cm[1].replace(',', '.')) : 1;
  const total = dGramos * cVal;

  if (total <= 0 || isNaN(total)) return 1.0;
  return Number(total.toFixed(2));
}

export default {
  calcularGramosRequeridos
};
