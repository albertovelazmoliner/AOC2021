const assert = require('assert');

class Fish {
    constructor(factor, timer) {
        this.factor = factor;
        this.timer = timer;
    }
}

function prepareData(originalData) {
    const parsedData = originalData.split(',').map(number => parseInt(number));
    let initialFish = [];
    for (let i = 1; i < 7; i++) {
        initialFish[i - 1] = parsedData.filter(value => value === i).length;
    }

    return initialFish.map((value, index) => new Fish(value, index + 1)).filter(fish => fish.factor > 0);
}

function runFishGrowing(days, data) {
    let score = 0;
    for (let i = 0; i < days; i++) {
        let addNew = 0;    
        data = data.map(fish => {
            if (fish.timer === 0) {
                addNew = addNew + fish.factor;
                fish.timer = 6;
            } else {
                fish.timer -= 1;
            }
            return fish;
        });
        if (addNew > 0) {
            data.push(new Fish(addNew, 8));
        }
    }
    
    data.forEach(fish => {
        score += fish.factor;
    });
    return score;
}

function aocDay6(days, data) {
    let fishData = prepareData(data);
    const result = runFishGrowing(days, fishData);
    return result;
}

// TEST 1

const testData = '3,4,3,1,2';

function test(testData) {
    assert.equal(aocDay6(18, testData), 26);
    console.log('test 1 passed');
    assert.equal(aocDay6(80, testData), 5934);
    console.log('test 2 passed');
}

test(testData);
