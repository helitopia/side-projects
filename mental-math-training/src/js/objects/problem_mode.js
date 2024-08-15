export {ProblemMode};

class ProblemMode {
    constructor(name, functionHandler, parameters) {
        this.name = name;
        this.functionHandler = functionHandler;
        this.parameters = parameters;
    }
}