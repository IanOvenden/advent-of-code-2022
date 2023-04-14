import makeTextFileLineIterator from "../../common/js/file.js";
import { generateAlphabet } from "../common/js/utility.js";

//global vars
let rangedRows = 0;
let counter = 0;
let grpAry = [];
let prevGrpAry = [];
let badge;
let badgeScoreTotal = 0;
let match;
let alphaAry = generateAlphabet(); // zero based

function countContainedRanges(rowsString) {
  const rows = rowsString.split('\n');
  let count = 0;
  for (let i = 0; i < rows.length; i++) {
    let rowRanges = rows[i].split(',');
    if (rowRanges.length !== 2) {
      continue; // Skip row if it doesn't contain 2 ranges
    }
    const range1 = rowRanges[0].split('-');
    const range1Start = parseInt(range1[0]);
    const range1End = parseInt(range1[1]);

    const range2 = rowRanges[1].split('-');
    const range2Start = parseInt(range2[0]);
    const range2End = parseInt(range2[1]);

    if ((range1Start <= range2Start && range1End >= range2End) ||
        (range1Start >= range2Start && range1End <= range2End)) {
      count++;
    }
  }
  return count;
}

fetch('data.txt')
  .then(response => response.text())
  .then(data => {
    // do something with the data
    rangedRows = countContainedRanges(data);

    // output the answer
    document.getElementById('answer1').innerHTML = rangedRows;
    document.getElementById('answer2').innerHTML = badgeScoreTotal;
  })
.catch(error => console.error(error));
