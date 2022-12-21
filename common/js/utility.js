export function generateAlphabet() {

    let lowerAry = [];
    let upperAry = [];
    let fullAry = [];
  
    upperAry = [...Array(26)].map((_, i) => String.fromCharCode(i + 65));
    lowerAry = [...Array(26)].map((_, i) => String.fromCharCode(i + 97));
    fullAry = lowerAry.concat(upperAry);
  
    return fullAry;
  }