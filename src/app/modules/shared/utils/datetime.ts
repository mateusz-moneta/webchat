function AddZero(num) {
  return (num >= 0 && num < 10) ? `0${num}` : num;
}

export function datetime() {
  const now = new Date();
  return [[AddZero(now.getDate()), AddZero(now.getMonth() + 1), now.getFullYear()].join('.'),
    [AddZero(now.getHours()), AddZero(now.getMinutes())].join(':')].join(' ');
}

export function datetimeSQL() {
  const now = new Date();
  return [[now.getFullYear(), AddZero(now.getMonth() + 1), AddZero(now.getDate())].join('-'),
    [AddZero(now.getHours()), AddZero(now.getMinutes()), AddZero(now.getSeconds())].join(':')].join(' ');
}
