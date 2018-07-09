module.exports = (string, array) => {
  let _string = string.split(' ');

  for(let i in _string) {
    for(let j in array) {
      if(_string[i] == array[j]) return parseInt(i);
    }
  }

  return false;
}