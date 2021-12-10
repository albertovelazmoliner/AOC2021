val ONE = 2
val FOUR = 4
val SEVEN = 3
val EIGHT = 7
val SIX_LETTERS = 6

class Board() {
    var segmentA = "-"
    var segmentB = "-"
    var segmentC = "-"
    var segmentD = "-"
    var segmentE = "-"
    var segmentF = "-"
    var segmentG = "-"
    var letters = mutableListOf<String>()

    fun setOne(letters: List<String>) {
        for (letter in letters) {
            if (!this.letters.contains(letter)) {   
                if(segmentC == "-") {
                    segmentC = letter
                } else if (segmentF == "-") {
                    segmentF = letter
                }
                this.letters.add(letter)
            } 
        }
    }

    fun setFour(letters: List<String>) {
        for (letter in letters) {
            if (!this.letters.contains(letter)) {   
                if(segmentB == "-") {
                    segmentB = letter
                } else if (segmentC == "-") {
                    segmentC = letter
                } else if (segmentD == "-") {
                    segmentD = letter
                } else if (segmentF == "-") {
                    segmentF = letter
                }
                this.letters.add(letter)
            }
        }
    }

    fun setSeven(letters: List<String>) {
        for (letter in letters) {
            if (!this.letters.contains(letter)) {   
                if(segmentA == "-") {
                    segmentA = letter
                } else if (segmentC == "-") {
                    segmentC = letter
                } else if (segmentD == "-") {
                    segmentD = letter
                } else if (segmentF == "-") {
                    segmentF = letter
                }
                this.letters.add(letter)
            }
        }        
    }

    fun setNine(letters: List<String>) {
        if (letters.contains(segmentA) && letters.contains(segmentB) && letters.contains(segmentC) && letters.contains(segmentD) && !letters.contains(segmentE) && letters.contains(segmentF)) {
            for (letter in letters) {
                if (!this.letters.contains(letter)) {   
                    var shouldAdd = false
                    if (segmentG == "-") {
                        segmentG = letter
                        shouldAdd = true
                    }
                    if (shouldAdd) {
                        this.letters.add(letter)
                    }
                }
            }
        }
    }

    fun setEight(letters: List<String>) {
        for (letter in letters) {
            if (!this.letters.contains(letter)) {  
                if(segmentA == "-") {
                    segmentA = letter
                } else if (segmentB == "-") {
                    segmentB = letter
                } else if (segmentC == "-") {
                    segmentC = letter
                } else if (segmentD == "-") {
                    segmentD = letter
                } else if (segmentE == "-") {
                    segmentE = letter
                } else if (segmentF == "-") {
                    segmentF = letter
                } else if (segmentG == "-") {
                    segmentG = letter
                } 
                this.letters.add(letter)
            }
            
        }
    }

    fun returnNumber(letters: List<String>): Int {
        if (letters.contains(segmentA) && letters.contains(segmentB) && letters.contains(segmentC) && letters.contains(segmentD) && !letters.contains(segmentE) && letters.contains(segmentF) && letters.contains(segmentG)) {
            return 9
        } else if (letters.contains(segmentA) && letters.contains(segmentB) && letters.contains(segmentC) && letters.contains(segmentD) && letters.contains(segmentE) && letters.contains(segmentF) && letters.contains(segmentG)) {
            return 8
        } else if (letters.contains(segmentA) && !letters.contains(segmentB) && letters.contains(segmentC) && !letters.contains(segmentD) && !letters.contains(segmentE) && letters.contains(segmentF) && !letters.contains(segmentG)) {
            return 7
        } else if (letters.contains(segmentA) && letters.contains(segmentB) && !letters.contains(segmentC) && letters.contains(segmentD) && letters.contains(segmentE) && letters.contains(segmentF) && letters.contains(segmentG)) {
            return 6
        } else if (letters.contains(segmentA) && letters.contains(segmentB) && !letters.contains(segmentC) && letters.contains(segmentD) && !letters.contains(segmentE) && letters.contains(segmentF) && letters.contains(segmentG)) {
            return 5
        } else if (!letters.contains(segmentA) && letters.contains(segmentB) && letters.contains(segmentC) && letters.contains(segmentD) && !letters.contains(segmentE) && letters.contains(segmentF) && !letters.contains(segmentG)) {
            return 4
        } else if (letters.contains(segmentA) && !letters.contains(segmentB) && letters.contains(segmentC) && letters.contains(segmentD) && !letters.contains(segmentE) && letters.contains(segmentF) && letters.contains(segmentG)) {
            return 3
        } else if (letters.contains(segmentA) && !letters.contains(segmentB) && letters.contains(segmentC) && letters.contains(segmentD) && letters.contains(segmentE) && !letters.contains(segmentF) && letters.contains(segmentG)) {
            return 2
        } else if (!letters.contains(segmentA) && !letters.contains(segmentB) && letters.contains(segmentC) && !letters.contains(segmentD) && !letters.contains(segmentE) && letters.contains(segmentF) && !letters.contains(segmentG)) {
            return 1
        } else if (letters.contains(segmentA) && letters.contains(segmentB) && letters.contains(segmentC) && !letters.contains(segmentD) && letters.contains(segmentE) && letters.contains(segmentF) && letters.contains(segmentG)) {
            return 0
        } else {
            return -1
        }
    }

    fun printBoard() {
        println("""
          ${segmentA} $segmentA $segmentA $segmentA 
        $segmentB         ${segmentC}
        $segmentB         $segmentC
          $segmentD $segmentD $segmentD $segmentD 
        $segmentE         $segmentF
        $segmentE         $segmentF
          $segmentG $segmentG $segmentG $segmentG
        """)
    }

    fun checkAndFixNumbers(letters: List<String>) {
        var allNumbers = mutableListOf<Int>()
        for (digit in letters) {
            var digitArray = stringToArrayOfStrings(digit)
            val numFromList = this.returnNumber(digitArray)
            if (numFromList != -1) {
                allNumbers.add(numFromList)
            }
        }
        if (allNumbers.size < 10) {
            if (!allNumbers.contains(3)) {
                val aux = this.segmentB
                this.segmentB = this.segmentD
                this.segmentD = aux
            }
            if (!allNumbers.contains(2) && !allNumbers.contains(5)) {
                val aux = this.segmentC
                this.segmentC = this.segmentF
                this.segmentF = aux
            }
        }
    }
}

// FIRST PART
fun findDigits1_4_7_8(data: String) : Int {
    val outputs = getOutputDigits(data)
    var result = 0
    for (digit in outputs){
        when (digit.length){
            ONE, FOUR, SEVEN, EIGHT -> result += 1
            else -> result += 0
        }
    }
    return result
}

// SECOND PART
fun findDigitsSecondPart(data: String): Int {
    val digits = findAllDigits(data)
    val result = digits.map { it.toInt() }.sum()
    return result
}

fun findAllDigits(data: String): List<String> {
    val digits = getDigits(data)
    val boards = setCodesInBoard(digits)
    val outputs = getOutputDigitsByRow(data)
    val result = mutableListOf<String>()
    for (i in 0 until boards.size) {
        val output = decode(boards[i], outputs[i])
        result.add(output)
    }
    return result
}

fun getOutputDigits(data: String): List<String>{
    var result = mutableListOf<String>()
    data.split("\n").map { it.split(" | ")[1].split(" ") }.map { it.map { result.add(it) } }
    return result
}

fun getOutputDigitsByRow(data: String): List<List<String>>{
    var result = mutableListOf<List<String>>()
    data.split("\n").map { it.split(" | ")[1].split(" ") }.map { result.add(it) }
    return result
}

fun getDigits(data: String): List<List<String>>{
    var result = mutableListOf<List<String>>()
    data.split("\n").map { it.split(" | ")[0].split(" ") }.map { result.add(it)  }
    return result
}

fun stringToArrayOfStrings(data: String): List<String> {
    val result = mutableListOf<String>()
    data.split("").map { if (it != "") result.add(it)  }
    return result
}

fun decode(board: Board, digits: List<String>): String {
    var finalNumber = ""
    for (digit in digits) {
        val digitArray = stringToArrayOfStrings(digit)
        finalNumber += board.returnNumber(digitArray)
    }
    return finalNumber
}

fun setCodesInBoard(data: List<List<String>>): List<Board> {
    val result = mutableListOf<Board>()
    data.map {
        val board = Board()
        val sortedDigits = it.sortedBy { it.length }
        sortedDigits.map {  
            val digit = stringToArrayOfStrings(it)
            when (digit.size) {
                ONE -> {
                    val letters = listOf<String>(digit[0], digit[1])
                    board.setOne(letters)
                }
                FOUR -> {
                    val letters = listOf<String>(digit[0], digit[1], digit[2], digit[3])
                    board.setFour(letters)
                }
                SEVEN -> {
                    val letters = listOf<String>(digit[0], digit[1], digit[2])
                    board.setSeven(letters)
                }
                SIX_LETTERS ->{
                    val letters = listOf<String>(digit[0], digit[1], digit[2], digit[3], digit[4], digit[5])
                    board.setNine(letters)
                }  
                EIGHT -> {
                    val letters = listOf<String>(digit[0], digit[1], digit[2], digit[3], digit[4], digit[5], digit[6])
                    board.setEight(letters)
                }
                else -> {}
            }
        }    
        board.checkAndFixNumbers(sortedDigits)
        result.add(board)
    }
    return result
}

fun main(){  
    testFirstPart(data)

    testSecondPart(data)
}

// TEST
fun testFirstPart(data: String) {
    val result = findDigits1_4_7_8(data)
    if (result == 26) {
        println("Test 1: $result, OK")
    } else {
        throw Exception("Test 1: $result is not 26, FAIL")
    }
}

fun testSecondPart(data: String) {
    val digits = findAllDigits(data)
    val result = digits.map { it.toInt() }.sum()
    if (result == 61229) {
        println("Test 2: $result, OK")
    } else {
       throw Exception("Test 2: $result is not 61229, FAIL")
    }
}

// TEST DATA
val data = 
"be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe\n" +
"edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc\n" +
"fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg\n" +
"fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb\n" +
"aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea\n" +
"fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb\n" +
"dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe\n" +
"bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef\n" +
"egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb\n" +
"gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce"
