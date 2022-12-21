import makeTextFileLineIterator from "../../common/js/file.js";
import { generateAlphabet } from "../common/js/utility.js";

//global vars
let totalScore = 0;
let counter = 0;
let grpAry = [];
let prevGrpAry = [];
let badge;
let badgeScoreTotal = 0;
let match;
let alphaAry = generateAlphabet(); // zero based

function processLine(line){

  //PART ONE
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

  let packCount = 0;

  duplicateAry.forEach(element => {
    //find index
    packCount = packCount + alphaAry.indexOf( element ) + 1;
  });

  totalScore = totalScore + packCount;
  
  // PART TWO
  if ( counter === 0 ) {

    prevGrpAry = strAry; //set the first comparison array (first string of the group)

    counter = counter + 1;
  
  } else if ( counter <= 1 ) {

    grpAry = [];

    strAry.map(( i ) => {
      match = prevGrpAry.indexOf(( i ));
      if( match > -1){
        grpAry.push(prevGrpAry.at( match ));
      }
    });

    counter = counter + 1;

  } else if (counter === 2) {

    badge = '';

    strAry.map(( i ) => {
      match = grpAry.indexOf(( i ));
      if( match > -1){
        badge = grpAry.at( match );
      }
    });

    //console.log(badge);
    badgeScoreTotal = badgeScoreTotal + alphaAry.indexOf( badge ) + 1;

    // reset
    counter = 0;

  }

}

async function run() {
  for await (const line of makeTextFileLineIterator('data.txt')) {
    processLine(line);
  }
  
  // output the answer
  document.getElementById('answer1').innerHTML = totalScore;
  document.getElementById('answer2').innerHTML = badgeScoreTotal;

}

run();
