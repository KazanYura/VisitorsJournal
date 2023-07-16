export const DIVISORS_COLORS = [
  '#444B6E',
  '#C44536',
  '#3D315B',
  '#FDE74C',
  '#9BC53D',
  '#D81159',
];
export const DEFAULT_FONT_STYLE = {fontSize: 20};
export const BIGGER_FONT_STYLE = {fontSize: 22};

export const toDisplayTime = (time, noTimeProvided = false) => {
  if (time) {
    const hours =
      time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
    const minutes =
      time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
    return hours + ':' + minutes;
  } else {
    return noTimeProvided ? 'N/A' : '';
  }
};

export function groupBy(list, keyGetter) {
  const map = new Map();
  list.forEach(item => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}

export function getPreviousMonday(d) {
  d = new Date(d);
  var day = d.getDay(),
    diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
  return new Date(d.setDate(diff));
}

export function getNextMonday(d) {
  d = new Date(d);
  var day = d.getDay(),
    diff = d.getDate() + ((7 - day + 1) % 7 || 7); // adjust when day is sunday
  return new Date(d.setDate(diff));
}

export function join(t, s) {
  let a = [{year: 'numeric'}, {month: '2-digit'}, {day: '2-digit'}];
  function format(m) {
    let f = new Intl.DateTimeFormat('en', m);
    return f.format(t);
  }
  return a.map(format).join(s);
}
