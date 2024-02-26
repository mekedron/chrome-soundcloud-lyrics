function randomString(len: number): string {
  let str = '';

  for (let i = 0; i < len; i++) {
    let rand = Math.floor(Math.random() * 62);
    let charCode = rand += rand > 9 ? (rand < 36 ? 55 : 61) : 48;
    str += String.fromCharCode(charCode);
  }

  return str;
}

export default randomString;