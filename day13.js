const assert = require('assert');

function parseData(data) {
    const lines = data.split('\n');
    const dots = [], folds = []
    lines.forEach(line => {
        if (line.indexOf('=') === -1 && line.length > 0) {
            dots.push(line.split(',').map(element => parseInt(element)));
        } else if(line.indexOf('=') > -1) {
            folds.push(line.substring(11, line.length).split('=').map((element, index) => index === 0 ? element : parseInt(element)));
        }
    });
    return {dots, folds};
}

function foldGrid(grid, fold) {
    let numberOfDots = 0
    const newGrid = [];
    const limitI = fold[0] === 'y' ? fold[1] : grid.length;
    const limitJ = fold[0] === 'y' ? grid[0].length : fold[1];
    for(let i = 0; i < limitI; i++) {
        const newLine = [];
        for(let j = 0; j < limitJ; j++) {
            const element = (fold[0] === 'y') ? grid[i][j] === '#' || grid[grid.length - 1 - i][j] === '#' ? '#' : '.'
            : grid[i][j] === '#' || grid[i][grid[0].length - 1 - j] === '#' ? '#' : '.';
            newLine.push(element);
            if (element === '#') numberOfDots++;
        }
        newGrid.push(newLine);
    }
    return {numberOfDots, newGrid};
}

function getDots(data) {
    let dotsNumber = 0;
    const {dots, folds} = parseData(data);
    let grid = createGrid(dots);
    for (let index = 0; index < folds.length; index++) {
        const {numberOfDots, newGrid} = foldGrid(grid, folds[index]);
        dotsNumber = numberOfDots;
        grid = newGrid;
    }
    grid.forEach(line => console.log(JSON.stringify(line)));
    return dotsNumber;
}

function createGrid(dots) {
    const maxX = dots.reduce((acc, dot) => Math.max(acc, dot[0]), 0);
    const maxY = dots.reduce((acc, dot) => Math.max(acc, dot[1]), 0);
    const grid = [];
    for(let i = 0; i <= maxY; i++) {
        const line = []
        for(let j = 0; j <= maxX; j++) {
            dots.find(dot => dot[0] === j && dot[1] === i) ? line.push('#') : line.push('.');
        }
        grid.push(line);
    }
    return grid;
}

// TEST PART 1

const dataTest = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`;

function testCode1(dataTest, foldSteps) {
    const result = getDots(dataTest, foldSteps);
    assert.equal(result, 16, 'test 1', 'Error in test 1')
    console.log('test 1 passed');
}
testCode1(dataTest, 1);
