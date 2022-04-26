var score = 0;
var difficulty = score**0.5;
var cap = 4;
var problist = [["sin(π/2)",1],["cos(π/2)",0],["sin(0)",0],["cos(0)",1],["ln(e^5)",5]];

function randInt(n,x) {
  var s=x-n;
  return Math.floor((Math.random()*s)+n);
}

function generateProblem() {
  type = randInt(0,difficulty>cap*10?cap:difficulty/10);
  if (type == 0) {
    let a = randInt(0, 5 + difficulty**0.8);
    let b = randInt(0, 5 + difficulty**0.8);
    if (randInt(0,2) && difficulty > 5) {
      let c = randInt(1, 26);
      return [`${a} + ${b} + ${c}`,a+b+c];
    } else {
      return [`${a} + ${b}`,a+b];
    }
  } else if (type == 1) {
    let a = randInt(10, 15 + difficulty**0.7);
    let b = randInt(0, 5 + difficulty**0.7);
    if (!randInt(0,5) && difficulty > 15) {
      let c = randInt(-(difficulty**0.7), difficulty**0.5);
      return [`${a} - ${b} - (${c})`,a-b-c];
    } else {
      return [`${a} - ${b}`,a-b];
    }
  } else if (type == 2) {
    let a = randInt(0, 3 + difficulty**0.6);
    let b = 0;
    if (!randInt(0,4)) {
      b = a;
    } else {
      b = randInt(0, 3 + difficulty**0.6);
    }
    if (!randInt(0,10) && difficulty > 50) {
      let c = randInt(0, 10)*randInt(0,4);
      return [`${a} x ${b} x ${c}`,a*b*c];
    } else {
      return [`${a} x ${b}`,a*b];
    }
  } else if (type == 3) {
    let b = randInt(1, difficulty**0.5);
    let a = randInt(0, difficulty**0.5)*b;
    if (randInt(0,4) && difficulty > 50) {
      let c = randInt(0, difficulty**0.5);
      return [`( ${a} / ${b} ) x ${c}`,a/b*c];
    } else {
      return [`${a} / ${b}`,a/b];
    }
  } else if (type == 4) {
    let a = randInt(0, difficulty**0.5);
    let b = randInt(0, 2+difficulty**0.2);
    return [`${a} ^ ${b}`,a**b];
  } else if (type == 5) {
    let a = randInt(0,difficulty**0.5);
    return [`sqrt(${a**2})`,a];
  } else if (type >= 6) {
    let i = randInt(0, difficulty**0.5);
    return problist[i] || [":(",randInt(1,10)];
  }
}
