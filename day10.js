const assert = require('assert');
    
const signValues = {
    '(': 1,
    '[': 2,
    '{': 3,
    '<': 4,
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
}

function getScore(data, isPartOne = true) {
    let result = 0;
    let incompleteLines = [];
    const lines = data.split('\n').map(line => line.split(''));

    for (let i = 0; i < lines.length; i++) {
        let data = [];
        let shouldAdd = true;
        for (let j = 0; j < lines[i].length; j++) {
            const element = lines[i][j];
            if (data.length === 0) {
                data.push(element);
            } else {
                if ((data[data.length - 1] === '[' && element === ']') ||
                    (data[data.length - 1] === '{' && element === '}') ||
                    (data[data.length - 1] === '<' && element === '>') ||
                    (data[data.length - 1] === '(' && element === ')')) {
                        data.pop();
                } else if ((element === ']' && data[data.length - 1] !== '[') ||
                    (element === '}' && data[data.length - 1] !=='{' ) ||
                    (element === '>' && data[data.length - 1] !=='<' ) ||
                    (element === ')' && data[data.length - 1] !=='(' )) {
                        if (isPartOne) {
                            result += signValues[`${element}`];
                        } else {
                            shouldAdd = false
                        }
                        break;
                } else {
                    data.push(element);
                }
            }
        };
        if (shouldAdd) incompleteLines.push(data.reverse());
    };

    if (isPartOne) return result;

    return completeLines(incompleteLines);
}

function completeLines(incompleteLines) {
    let results = []
    incompleteLines.forEach(line => {
        let score = 0;
        line.forEach(element => { score = (score * 5) + signValues[`${element}`]; });
        results.push(score);
    })
    return results.sort((a, b) => a - b)[Math.trunc(results.length / 2)];
}

// TEST
const dataTest = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`;

// TEST PART 1
function testCode1(dataTest, isPartOne = true) {
    const result = getScore(dataTest, isPartOne);
    assert.equal(result, 26397, 'test 1', 'Error in test 1')
    console.log('test 1 passed');
}
testCode1(dataTest);

// TEST PART 2
function testCode2(dataTest, isPartOne = false) {
    const result = getScore(dataTest, isPartOne);
    assert.equal(result, 288957, 'test 2', 'Error in test 2')
    console.log('test 2 passed');
}
testCode2(dataTest);
