import makeTextFileLineIterator from "../../common/js/file.js";

//global vars
let totalScore = 0;
let p2TotalScore = 0;

//choices
const choicePts = [
  {letter: 'X', oppLetter: 'A', label: 'Rock', points: 1, beats: 'C', beatenBy: 'B'}, 
  {letter: 'Y', oppLetter: 'B', label: 'Paper', points: 2, beats: 'A', beatenBy: 'C'}, 
  {letter: 'Z', oppLetter: 'C', label: 'Scissors', points: 3, beats: 'B', beatenBy: 'A'}
]

function processLine(line){

  let roundScore = 0;
  let p2RoundScore = 0;
  let winState = line.charAt(2);
  let oppChoice =  choicePts.find(i => i.oppLetter === line.charAt(0));
  let playChoice = choicePts.find(i => i.letter === line.charAt(2));

  //console.log(line);
  roundScore = roundScore + playChoice['points'];

  //win
  if ( playChoice['beats'] === oppChoice['oppLetter'] ){
    roundScore = roundScore + 6;
  } else if ( playChoice['beatenBy'] === oppChoice['oppLetter'] ) {
    roundScore = roundScore;
  } else {
    roundScore = roundScore + 3;
  }

  totalScore = totalScore + roundScore;

  //puzzle 2
  if (winState === 'Z') {
    //win
    let newPlayChoice = choicePts.find(i => i.oppLetter === oppChoice.beatenBy);

    p2RoundScore = p2RoundScore + newPlayChoice.points + 6;

  } else if (winState === 'X') {
    //lose
    let newPlayChoice = choicePts.find(i => i.oppLetter === oppChoice.beats);
    p2RoundScore = p2RoundScore + newPlayChoice.points;
  } else {
    //draw
    console.log('draw');
    let newPlayChoice = choicePts.find(i => i.oppLetter === oppChoice.oppLetter);
    p2RoundScore = p2RoundScore + newPlayChoice.points + 3;
  }
  
  console.log(p2RoundScore);

  p2TotalScore = p2TotalScore + p2RoundScore;

}

async function run() {
  for await (const line of makeTextFileLineIterator('data.txt')) {
    processLine(line);
  }

  
  // output the answer
  document.getElementById('answer1').innerHTML = totalScore;
  document.getElementById('answer2').innerHTML = p2TotalScore;

}

run();
