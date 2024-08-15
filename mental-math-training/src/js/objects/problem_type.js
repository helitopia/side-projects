export {Problem, MathBinaryProblem, DateProblem};

class Problem {
    constructor(solution) {
        this.solution = solution;
    }
}

class MathBinaryProblem extends Problem {
    constructor(operand1, operand2, operator, solution) {
        super(solution);
        this.operand1 = operand1;
        this.operand2 = operand2;
        this.operator = operator;
    }

    display() {
        return `${this.operand1} ${this.operator} ${this.operand2} = `;
    }
}

class DateProblem extends Problem {
    constructor(question, solution) {
        super(solution);
        this.question = question;
    }

    display() {
        return this.question + " = ";
    }
}