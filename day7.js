const assert = require('assert');

function cheapestFuel(data) {
    const crabPositions = data.split(',').map(number => parseInt(number)).sort((a, b) => a - b);
    let min = crabPositions[0];
    let max = crabPositions[crabPositions.length - 1];
    let fuel = Infinity; 
    for (let i = min; i <= max; i++) {
        let currentFuel = 0;
        for (let j = 0; j < crabPositions.length; j++) {
            const steps = Math.abs(i - crabPositions[j]);
            currentFuel += (steps * (steps + 1)) / 2;
        }
        
        if (currentFuel < fuel) {
            fuel = currentFuel;
        } else {
            break;
        }
        
    }
    return fuel;
}

// TEST 1
const dataTest = '16,1,2,0,4,2,7,1,2,14';

function testCode(dataTest) {
    const result = cheapestFuel(dataTest);
    assert.equal(result, 168, 'test 1', 'Error in test')
    console.log('test 1 passed');
}

testCode(dataTest)
