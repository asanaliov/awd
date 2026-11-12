function calculate(operator, a, b) {
    const x = Number(a);
    const y = Number(b);
    if (isNaN(x) || isNaN(y)) return "Invalid number";

    switch (operator) {
        case "+": return x + y;
        case "-": return x - y;
        case "*": return x * y;
        case "/": return y === 0 ? "Division by zero" : x / y;
        case "%": return y === 0 ? "Division by zero" : x % y;
        case "**": return x ** y;
        default: return "Unknown operator";
    }
}

const operations = {
    "+": (x, y) => x + y,
    "-": (x, y) => x - y,
    "*": (x, y) => x * y,
    "/": (x, y) => y === 0 ? "Division by zero" : x / y,
    "%": (x, y) => y === 0 ? "Division by zero" : x % y,
    "**": (x, y) => x ** y
};

function calculateLookup(operator, a, b) {
    const x = Number(a);
    const y = Number(b);
    if (isNaN(x) || isNaN(y)) return "Invalid number";
    if (!operations.hasOwnProperty(operator)) return "Unknown operator";
    return operations[operator](x, y);
}

function evaluateChain(expression) {
    const tokens = expression.split(" ");
    if (tokens.length % 2 === 0 || tokens.includes("")) return "Invalid expression";

    let result = Number(tokens[0]);
    if (isNaN(result)) return "Invalid number";

    for (let i = 1; i < tokens.length; i += 2) {
        result = calculateLookup(tokens[i], result, tokens[i + 1]);
        if (typeof result === "string") return result;
    }
    return result;
}
