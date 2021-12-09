const assert = require('assert');

function findLowPoints(data, isPartOne = true) {
    let result = 0;
    let basins = [];
    const numberGrid = data.split('\n').map(number => number.split('').map(number => parseInt(number)));
    for (let i = 0; i < numberGrid.length; i++) {

        for (let j = 0; j < numberGrid[i].length; j++) {
            let fourSides = 0
            let isOnLimit = false;
            let isOnCorner = false;
            if (i > 0) {
                if (numberGrid[i][j] < numberGrid[i - 1][j]) {
                    fourSides++;
                }
            } else {
                isOnLimit = true;
            }
            if (j > 0) {
                if (numberGrid[i][j] < numberGrid[i][j - 1]) {
                    fourSides++;
                }
            } else {
                if (isOnLimit) {
                    isOnCorner = true;
                } else {
                    isOnLimit = true;
                }
            }
            if (i < numberGrid.length - 1) {
                if (numberGrid[i][j] < numberGrid[i + 1][j]) {
                    fourSides++;
                }
            } else {
                if (isOnLimit) {
                    isOnCorner = true;
                } else {
                    isOnLimit = true;
                }
            }
            if (j < numberGrid[i].length - 1) {
                if (numberGrid[i][j] < numberGrid[i][j + 1]) {
                    fourSides++;
                }
            } else {
                if (isOnLimit) {
                    isOnCorner = true;
                } else {
                    isOnLimit = true;
                }
            }
            if (isOnCorner && fourSides === 2 || isOnLimit && fourSides === 3 || fourSides === 4) {
                result += numberGrid[i][j] + 1;
                if (!isPartOne) {
                     const data = findBasin(numberGrid, i, j, numberGrid.length, numberGrid[i].length);
                     const size = cleanData(data);
                     basins.push(size);
                }
            }
        }
    }

    if (isPartOne) {
        return result;
    }
    basins.sort((a, b) => a - b);
    return basins[basins.length - 1] * basins[basins.length - 2] * basins[basins.length - 3];
}

function findBasin(numberGrid, i, j, rows, columns, queue = []) {
    queue.push([i, j]);
    if (i > 0 && numberGrid[i][j] < numberGrid[i - 1][j] && numberGrid[i - 1][j] < 9) {
        queue.push([i - 1, j]);
        findBasin(numberGrid, i - 1, j, rows, columns, queue);
    }
    if (j > 0 && numberGrid[i][j] < numberGrid[i][j - 1] && numberGrid[i][j - 1] < 9) {
        queue.push([i, j - 1]);
        findBasin(numberGrid, i, j - 1, rows, columns, queue);
    }
    if (i < rows - 1 && numberGrid[i][j] < numberGrid[i + 1][j] && numberGrid[i + 1][j] < 9) {
        queue.push([i + 1, j]);
        findBasin(numberGrid, i + 1, j, rows, columns, queue);
    }
    if (j < columns - 1 && numberGrid[i][j] < numberGrid[i][j + 1] && numberGrid[i][j + 1] < 9) {
        queue.push([i, j + 1]);
        findBasin(numberGrid, i, j + 1, rows, columns, queue);
    }

    return queue;
}

function cleanData(data) {
    const uniqueElements = new Set();
    data.forEach(element => {
        const elementLabel = JSON.stringify(element);
        if (!uniqueElements.has(elementLabel)) {
            uniqueElements.add(elementLabel);
        }
    });

    return uniqueElements.size;
}

// TEST
const dataTest = `2199943210
3987894921
9856789892
8767896789
9899965678`;

// TEST PART 1
function testCode1(dataTest, isPartOne = true) {
    const result = findLowPoints(dataTest, isPartOne);
    assert.equal(result, 15, 'test 1', 'Error in test 1')
    console.log('test 1 passed');
}
testCode1(dataTest);


// TEST PART 2
function testCode2(dataTest, isPartOne = false) {
    const result = findLowPoints(dataTest, isPartOne);
    assert.equal(result, 1134, 'test 2', 'Error in test 2')
    console.log('test 2 passed');
}
testCode2(dataTest);
