//-------------------------------

const problem =[
    "...........................",
    "....o......................",
    "............o..............",
    "...........................",
    "....o......................",
    "...........................",
    "...............o...........",
    "......o..............o.....",
    "..o.......o................",



]


//-------------------------------


let gridWidth = problem[0].length;
let gridHeight = problem.length;

console.log("gridWidth = " +gridWidth+"     gridHeight = "+gridHeight);

solver=()=>{
   // let res = getMaxRight(0,10)
   res = getSolution()
    console.log("res = ");
    console.log(res);

    displaySolution(res);

}
displaySolution = (res)=>{
    let x = Math.floor(res[0]/gridWidth)
    let y = res[0]-x
    let size = res[1]
    console.log("x = "+x+" y = "+y+ " size = "+size);

    let matrix = [...problem]
    for (let i = 0; i < size; i++) {

        for (let u = 0; u < size; u++) {
            matrix[x+i]=setCharAt(matrix[x+i], y+u,"X")
            
        }
        
    }
    matrix[1][1]="X"
    for (let i = 0; i < gridHeight; i++) {
        console.log(matrix[i]);
        
    }
    
}






getSolution =()=>{
let result = getAllSquares()
let index = -1;
let solution = [-1,0,0]
let tempHighest = 0;
console.log("res = ");
console.log(result);
for (let i = 0; i < result.length; i++) {
    let ind = result[i]
    if (ind>tempHighest) {
        tempHighest = ind;
        index = i
        
    }
    
}
solution =[index, tempHighest]
return solution
}

getAllSquares = ()=>{
    let result = []
    for (let i = 0; i < gridHeight; i++) {
        for (let u = 0; u < gridWidth; u++) {
            let res = getMaxSquare(i,u)
            result.push(res)
        }
        
    }
    return result
}




getMaxSquare = (posX, posY)=>{
    if (posX>gridHeight-1 || posY>gridWidth-1) {
        //console.log("overflow51  x = "+x+"  y = "+y );
        return 0
    }
    if(problem[posX][posY]=="o") return 0

    let size = 1;
    let inc = 1
    let res =true
    while (res) {
        res = extendRight(posX, posY,inc)
        if (res) {
            size++;
            inc++
        }
    }

return  size

}


extendRight = (posX, posY, inc)=>{
    let x = posX+inc
    let y = posY+inc
    if (x>gridHeight-1 || y>gridWidth-1) {
        //console.log("overflow  x = "+x+"  y = "+y );
        return false
    }
    let right = false;
  
       right = checkRight(posX, posY, inc);
  
   // console.log("right = "+right);
    let bottom = false;
    
    bottom = checkBottom(posX, posY, inc);
  
    //console.log("bottom = "+bottom);

   if(right&&bottom)return true
   return false

}

checkRight=(posX, posY, inc)=>{
    let x = posX+inc
    let y = posY+inc
    if (x>gridHeight-1 || y>gridWidth-1) {
       // console.log("overflow  x = "+x+"  y = "+y );
        return false
    }
    for (let i = 0; i <= inc; i++) {
        if (problem[posX+i][y]=="o") {
            //console.log("Right issue :  x = "+(posX+i)+"  y = "+y );
            return false
        }
        
    }
return true
}

checkBottom=(posX, posY, inc)=>{
    let x = posX+inc
    let y = posY+inc
    if (x>gridHeight-1 || y>gridWidth-1) {
       // console.log("overflow  x = "+x+"  y = "+y );
        return false
    }
    for (let i = 0; i <= inc; i++) {
        if (problem[x][posY+i]=="o") {
            //console.log("Bottom issue :  x = "+x+"  y = "+(posY+i) );

            return false
        }
        
    }
return true
}


function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}






