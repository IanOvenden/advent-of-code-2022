import makeTextFileLineIterator from "../../common/js/file.js";

//global vars
let elves = new Array;
let calories = 0

function processLine(line){
  
  // if line is empty add value as an elf, else add the value to current elf calorie count
  if (line === "") {
    elves.push(calories);
    calories = 0;
  } else {
    calories = parseInt(calories) + parseInt(line);
  }
}

function compareNumbers(a, b) {
  return a - b;
}

async function run() {
  for await (const line of makeTextFileLineIterator('data.txt')) {
    processLine(line);
  }

  // find the max value in the array
  const max = elves.reduce((a, b) => Math.max(a, b), -Infinity); 
  document.getElementById('answer1').innerHTML = max;

  // sort the array
  elves.join();
  elves.sort();
  elves.sort(compareNumbers);

  // get the highest three
  let topThree;
  topThree = elves.slice(elves.length-3, elves.length);

  const initialValue = 0;
  const sumWithInitial = topThree.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
  );

  console.log(topThree);
  console.log(sumWithInitial);

  document.getElementById('answer2').innerHTML = sumWithInitial;

}

run();
