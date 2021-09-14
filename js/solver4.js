//-------------------------------

// const problem2 = [
//   "...........................",
//   "....o......................",
//   "........o...o..............",
//   "................o....o.....",
//   "....o......................",
//   "...........................",
//   "...............o...........",
//   "......o..............o.....",
//   "..o.......o................",
// ];
//
// const problem2 = [
//   "...........................",
//   "...........................",
//   "...........................",
//   "...........................",
//   "...........................",
//   "....o......................",
//   "...........................",
//   "...........................",
//   "...........................",
// ];

const problem2 = [
  "...........................",
  "...........................",
  "...........................",
  "...........................",
  "...........................",
  "...............o...........",
  "...........................",
  "...........................",
  "...........................",
];

//-------------------------------
let matrix = [];
//-------------------------------

let gridWidth = problem2[0].length;
let gridHeight = problem2.length;
let tempMaxSize = 0;
let loops = 0;

solver = () => {
  // let res = getMaxRight(0,10)
  setMatrix();
  res = getSolution();
  console.log("res = ");
  console.log(res);

  displaySolution(res);
};

setMatrix = () => {
  for (let i = 0; i < problem2.length; i++) {
    let str = problem2[i];
    let temp = [];

    for (let u = 0; u < str.length; u++) {
      temp.push(str[u]);
    }
    matrix.push(temp);
  }
};
displaySolution = (res) => {
  let x = Math.floor(res[0] / gridWidth);
  let y = res[0] - x;
  let size = res[1];
  let disp = [...matrix];

  for (let i = 0; i < gridHeight; i++) {
    for (let u = 0; u < gridWidth; u++) {
      if (u >= y && u < size + y && i >= x && i < x + size) {
        disp[i][u] = "X";
      }
      if (disp[i][u] == "F") {
        disp[i][u] = ".";
      }
    }
  }
  console.log("disp = ");
  console.log(disp);
  for (let i = 0; i < disp.length; i++) {
    // console.log("disp[i] = ");
    // console.log(disp[i]);
    console.log(disp[i].join(""));
  }
  console.log("loops = " + loops);
};

getSolution = () => {
  let result = getAllSquares();
  let index = -1;
  let solution = [-1, 0, 0];
  let tempHighest = 0;
  console.log("res = ");
  console.log(result);
  for (let i = 0; i < result.length; i++) {
    let ind = result[i];
    if (ind > tempHighest) {
      tempHighest = ind;
      index = i;
    }
  }
  solution = [index, tempHighest];
  return solution;
};

getAllSquares = () => {
  let result = [];
  for (let i = 0; i < gridHeight; i++) {
    for (let u = 0; u < gridWidth; u++) {
      if (i >= tempMaxSize || u >= tempMaxSize) {
        let res = getMaxSquare(i, u);
        result.push(res);
        if (res > tempMaxSize) {
          tempMaxSize = res;
        }
      } else {
        console.log("else");
        result.push(0);
      }
    }
  }
  return result;
};

getMaxSquare = (posX, posY) => {
  if (matrix[posX][posY] == "o") return 0;
  if (matrix[posX][posY] == "F") return 0;

  let size = 1;
  let inc = 1;
  let res = [true, false, false];
  while (res[0]) {
    res = extendRight(posX, posY, inc);
    if (res[0]) {
      size++;
      inc++;
    }
  }

  //fill matrix with done
  let sizeX;
  let sizeY;
  // [result, right, bottom, xr, yr, xb, yb]
  if (res[1] && res[2]) {
    sizeX = size;
    sizeY = size;
  } else if (!res[1]) {
    sizeX = res[3];
    sizeY = res[4];
  } else if (res[2]) {
    sizeX = res[6];
    sizeY = res[7];
  }

  for (let i = posX; i < sizeX; i++) {
    for (let u = posY; u < sizeY; u++) {
      matrix[i][u] = "F";
    }
  }

  return size;
};

extendRight = (posX, posY, inc) => {
  let x = posX + inc;
  let y = posY + inc;

  //let right = false;

  let right = checkRight(posX, posY, inc);

  //let bottom = false;
  let bottom = checkBottom(posX, posY, inc);

  // return [result, right, bottom, xr, yr, xb, yb]
  if (right[0] && bottom[0])
    return [true, false, false, right[1], right[2], bottom[1], bottom[2]];
  if (!right[0] && !bottom[0])
    return [false, true, true, right[1], right[2], bottom[1], bottom[2]];
  if (!right[0])
    return [false, true, false, right[1], right[2], bottom[1], bottom[2]];
  if (!bottom[0])
    return [false, false, true, right[1], right[2], bottom[1], bottom[2]];
};

checkRight = (posX, posY, inc) => {
  let x = posX + inc;
  let y = posY + inc;
  if (x > gridHeight - 1 || y > gridWidth - 1) {
    // console.log("overflow  x = "+x+"  y = "+y );
    return [false, x, y];
  }
  for (let i = 0; i <= inc; i++) {
    loops++;
    if (matrix[posX + i][y] == "o") {
      //console.log("Right issue :  x = "+(posX+i)+"  y = "+y );
      return [false, x, y];
    }
  }
  return [true, x, y];
};

checkBottom = (posX, posY, inc) => {
  let x = posX + inc;
  let y = posY + inc;
  if (x > gridHeight - 1 || y > gridWidth - 1) {
    return [false, x, y];
  }
  for (let i = 0; i <= inc; i++) {
    loops++;
    if (matrix[x][posY + i] == "o") {
      return [false, x, y];
    }
  }
  return [true, x, y];
};
