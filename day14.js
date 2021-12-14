const assert = require('assert');

function parseData(data) {
    const lines = data.split('\n');
    let template = null, formulas = {} 
    lines.forEach((line, index) => {
        if(index === 0) {
            template = line.split('');
        } else if (index > 1) {
            line = line.split(' -> ');
            formulas[`${line[0]}`] = line[1];
        }
    });
    return {template, formulas};
}

function getNewTemplate(template, formulas) {
    let newTemplate = [];
    for(let i = 0; i < template.length - 1; i += 1) {
        newTemplate.push(`${template[i]}`);
        newTemplate.push(formulas[`${template[i]}${template[i + 1]}`]);
        if (i === template.length - 2) {
            newTemplate.push(`${template[i + 1]}`);
        }
    }
    return newTemplate;
}  

function getResult(arr) {
    const hashmap = arr.reduce( (acc, val) => {
        acc[val] = (acc[val] || 0 ) + 1
        return acc
    }, {});
    const lessElement = Object.keys(hashmap).reduce((acc, val) => {
        return hashmap[acc] < hashmap[val] ? acc : val
    });
    const mostElement = Object.keys(hashmap).reduce((a, b) => hashmap[a] > hashmap[b] ? a : b)
    return arr.filter(val => val === mostElement).length - arr.filter(val => val === lessElement).length;
}

function getPolymer(data, steps) {
    let polymer = "";
    let {template, formulas} = parseData(data);
    for (let index = 0; index < steps; index++) {
        template = getNewTemplate(template, formulas);
    }
    return getResult(template);
}

// TEST PART 1
const dataTest = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`;

function testCode1(dataTest, steps) {
    const result = getPolymer(dataTest, steps);
    assert.equal(result, '1588', 'test 1', 'Error in test 1')
    console.log('test 1 passed');
}
testCode1(dataTest, 10);
