var blocks = 0;
var blocks_now = 0;
var block_heights = [];
var block_answers = [];
var block_xpos = [];
var collumns = [0,0,0,0,0];
var end = !1;
var difscale = 0.5;
var base_delay = 5000;
var dif = "normale";

function update_block(block) {
  if (block_heights[block] > 0) {
    block_heights[block] -= 5;
    document.getElementById("question_" + block).style.bottom = `${block_heights[block]}px`;
    setTimeout(function(){update_block(block)},50*(0.9**(blocks_now<5?5:blocks_now)));
  }
}

function solve(block) {
  if (end) {
    return;
  }
  current_answer = document.getElementById("answerbox").value;
  document.getElementById("answerbox").value = "";
  document.getElementById("answerbox").focus();
  if (current_answer == block_answers[block]) {
    block_heights[block] = 0;
    document.getElementById(`question_${block}`).remove();
    blocks_now -= 1;
    collumns[block_xpos[block]] -= 1;
    score += 1*Math.floor(difficulty+1);
    document.getElementById("score").innerHTML = score*100;
    difficulty = score**difscale;
  }
}

function chooseCollumn() {
  if (collumns == [9,9,9,9,9]) {
    end = !0;
    return 5;
  }
  let spaces = [];
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 9 - collumns[i]; j++) {
      spaces.push(i);
    }
  }
  let col = spaces[randInt(0,spaces.length)];
  collumns[col] += 1;
  return col;
}

function spawn_block() {
  let col = chooseCollumn();
  if (col == 5) {
    return;
  }
  let prob = generateProblem(0);
  document.getElementById(`col${col}`).innerHTML = `<div class="question" id="question_${blocks}" style="bottom:600px;" onclick="solve(${blocks})">${prob[0]}</div>` + document.getElementById(`col${col}`).innerHTML;
  block_answers[blocks] = prob[1];
  block_heights[blocks] = [600];
  block_xpos[blocks] = col;
  update_block(blocks);
  blocks += 1;
  blocks_now += 1;
  setTimeout(function(){spawn_block();},(5000+100*difficulty**0.8)*(0.9**(blocks_now<5?35:blocks_now)));
}

function spawn_first() {
  document.getElementById("difficulty_select").style.display = "none";
  document.getElementById("input").style.display = "block";
  document.getElementById("answerbox").focus();
  spawn_block();
}

function dif_easy() {
  dif = "facile";
  difscale = 0.4;
  base_delay = 10000;
  cap = 4;
  spawn_first();
}

function dif_normal() {
  dif = "normale";
  difscale = 0.5;
  base_delay = 5000;
  cap = 5;
  spawn_first();
}

function dif_hard() {
  dif = "expert";
  difscale = 0.55;
  base_delay = 3000;
  cap = 6;
  spawn_first();
}
