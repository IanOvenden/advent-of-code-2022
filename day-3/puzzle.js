import makeTextFileLineIterator from "../../common/js/file.js";

//global vars
let totalScore = 0;

function generateAlphabet(capital = true) {

  let lowerAry = [];
  let upperAry = [];
  let fullAry = [];

  upperAry = [...Array(26)].map((_, i) => String.fromCharCode(i + 65));
  lowerAry = [...Array(26)].map((_, i) => String.fromCharCode(i + 97));
  fullAry = lowerAry.concat(upperAry);

  return fullAry;
}

let alphaAry = generateAlphabet(); // zero based

function processLine(line){

  console.log(line);

  let strAry = line.split('');
  
  // splice in half
  let comp1Ary = strAry.slice(0, (strAry.length/2));
  let comp2Ary = strAry.slice((strAry.length/2), strAry.length);

  let duplicateAry = new Array;

  comp1Ary.map((element) => { 
    comp2Ary.find((elementCheck) => { 
      if (element === elementCheck) {
        //does it already exist in the array
        if(!duplicateAry.includes(elementCheck)) {
          duplicateAry.push(elementCheck);
        }
      }
     });
  })

  console.log(duplicateAry);

  let packCount = 0;

  duplicateAry.forEach(element => {
    //find index
    packCount = packCount + alphaAry.indexOf( element ) + 1;
    console.log(packCount);
  });

  totalScore = totalScore + packCount;

}

async function run() {
  for await (const line of makeTextFileLineIterator('data.txt')) {
    processLine(line);
  }
  
  // output the answer
  document.getElementById('answer1').innerHTML = totalScore;

}

run();
