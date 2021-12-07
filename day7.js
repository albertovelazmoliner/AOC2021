const assert = require('assert');

function cheapestFuel(data, isPartOne = true) {
    const crabPositions = data.split(',').map(number => parseInt(number)).sort((a, b) => a - b);
    let min = crabPositions[0];
    let max = crabPositions[crabPositions.length - 1];
    let fuel = Infinity; 
    for (let i = min; i <= max; i++) {
        let currentFuel = 0;
        for (let j = 0; j < crabPositions.length; j++) {
            if (isPartOne) {
                currentFuel += Math.abs(i - crabPositions[j]);
            } else {
                const steps = Math.abs(i - crabPositions[j]);
                currentFuel += (steps * (steps + 1)) / 2;
            }
        }
        
        if (currentFuel < fuel) {
            fuel = currentFuel;
        } else {
            break;
        }
        
    }
    return fuel;
}

// TEST
const dataTest = '16,1,2,0,4,2,7,1,2,14';

// TEST PART 1
function testCode1(dataTest, isPartOne = true) {
    const result = cheapestFuel(dataTest, isPartOne);
    assert.equal(result, 37, 'test 1', 'Error in test 1')
    console.log('test 1 passed');
}
testCode1(dataTest);

// TEST PART 2
function testCode2(dataTest, isPartOne = false) {
    const result = cheapestFuel(dataTest, isPartOne);
    assert.equal(result, 168, 'test 1', 'Error in test 2')
    console.log('test 2 passed');
}
testCode2(dataTest);
