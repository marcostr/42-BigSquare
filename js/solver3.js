//-------------------------------

const input = [
  "...........................",
  "....o......................",
  "............o..............",
  "...........................",
  "....o......................",
  "...........................",
  "...............o...........",
  "......o..............o.....",
  "..o.......o................",
];

//-------------------------------
let problem;
let gridWidth = input[0].length;
let gridHeight = input.length;
//-------------------------------
solver = () => {
  setProblemMatrix();
  console.log(problem);

  res = getSolution();
  console.log("res = ");
  console.log(res);
};

setProblemMatrix = () => {
  problem = [];
  for (let i = 0; i < gridHeight; i++) {
    let line = [];
    let str = input[i];
    for (let u = 0; u < gridWidth; u++) {
      line.push(str[u]);
    }
    problem.push(line);
  }
};

getSolution = () => {
  let res = getAllSquares();
  console.log(res);
};


getAllSquares = () => {
  console.log("start");
  let result = [];
  for (let i = 0; i < gridHeight; i++) {
    for (let u = 0; u < gridWidth; u++) {
      let res = getMaxSquare(i, u);
      result.push(res);
    }
  }
  return result;
};

getMaxSquare = (posX, posY) => {
  if (posX > gridHeight - 1 || posY > gridWidth - 1) {
    //console.log("overflow51  x = "+x+"  y = "+y );
    return 0;
  }
  if (problem[posX][posY] == "o") return [0, "o", posX];

  let size = 1;
  let inc = 1;
  let border = "";
  let pos = 0;
  let res = [true, ""];
  let isOk = true;
  while (isOk) {
    res = extendRight(posX, posY, inc);

    if (res[0]) {
      size++;
      inc++;
    } else {
      border = res[1];
      pos = res[2];
      isOk = false;
    }
  }

  return [size, border, pos];
};

extendRight = (posX, posY, inc) => {
  let x = posX + inc;
  let y = posY + inc;
  if (x > gridHeight - 1 || y > gridWidth - 1) {
    return [false, "l", x];
  }
  let right = false;
  right = checkRight(posX, posY, inc);
  let bottom = false;
  bottom = checkBottom(posX, posY, inc);

  if (right[0] && bottom[0]) return [true, ""];
  if (!right[0]) return [false, "r", right[1]];
  if (!bottom[0]) return [false, "b", bottom[1]];
};

checkRight = (posX, posY, inc) => {
  let x = posX + inc;
  let y = posY + inc;
  if (x > gridHeight - 1 || y > gridWidth - 1) {
    return [false, "l", x];
  }
  for (let i = 0; i <= inc; i++) {
    if (problem[posX + i][y] == "o") {
      return [false, posX + i];
    }
  }
  return [true, "", x];
};

checkBottom = (posX, posY, inc) => {
  let x = posX + inc;
  let y = posY + inc;
  if (x > gridHeight - 1 || y > gridWidth - 1) {
    return [false, "l", x];
  }
  for (let i = 0; i <= inc; i++) {
    if (problem[x][posY + i] == "o") {
      return [false, posX + i];
    }
  }
  return [true, "", x];
};
