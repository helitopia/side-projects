import {MathBinaryProblem} from "../objects/problem_type.js";
import {randomPart} from "../util.js";

export {binaryOperation, addition, subtraction, multiplication};

/**
 * General function to generate various binary problems
 * @param operandOneRange two-element array [range_start, range_end]
 * @param operandTwoRange
 * @param operandFilter predicate that receives both operands on input and returns boolean
 * indicating whether to include such case into problem set
 * @param problemAmount amount of problems to generate in randomized order
 * @param operationSymbol symbol to be displayed to denote operation
 * @param operationFunc operation function via which the solution to the problem is calculated
 */
function binaryOperation(problemAmount, operandOneRange, operandTwoRange, operandFilter, operationSymbol, operationFunc) {
    operandTwoRange ||= [...operandOneRange];
    operandFilter ||= () => true;

    let problems = [];
    for (let [start1, end1] = operandOneRange; start1 < end1; start1++)
        for (let [start2, end2] = operandTwoRange; start2 < end2; start2++) {
            if (!operandFilter(start1, start2))
                continue
            let operandOne = start1;
            let operandTwo = start2;
            problems.push(new MathBinaryProblem(operandOne, operandTwo, operationSymbol, operationFunc(operandOne, operandTwo)))
        }
    return randomPart(problems, problemAmount);
}

function subtraction(problemAmount, operandOneRange, operandTwoRange, operandFilter) {
    return binaryOperation(
        problemAmount,
        operandOneRange,
        operandTwoRange,
        operandFilter,
        "-",
        (x, y) => x - y
    );
}

function addition(problemAmount, operandOneRange, operandTwoRange, operandFilter) {
    return binaryOperation(
        problemAmount,
        operandOneRange,
        operandTwoRange,
        operandFilter,
        "+",
        (x, y) => x + y
    );
}

function multiplication(problemAmount, operandOneRange, operandTwoRange, operandFilter) {
    return binaryOperation(
        problemAmount,
        operandOneRange,
        operandTwoRange,
        operandFilter,
        "x",
        (x, y) => x * y
    );
}