function compute() {
    var input = document.getElementById("equationInput").value;
    document.getElementById("equationOutput").innerHTML = evaluate(input);
}

function evaluate(input) {
    var operators = new Array();
    var ops = "+-*/^"
    var nums = "0123456789.!"
    var numbers = new Array();
    for (var i = 0; i < input.length; i++) {
        term = "" + input.charAt(i);
        if (term == '(') {
            operators.push('(')
        } else if (term == ')') {
            while (numbers.length > 1 && (operators[operators.length - 1]) != '(') {
                numbers.push(calculate(operators.pop(), numbers.pop(), numbers.pop()));
            }
            operators.pop();
        } else if (ops.includes(term)) {
            while (numbers.length > 1 && operators.length != 0 && bFirst(term, operators[operators.length - 1])) {
                numbers.push(calculate(operators.pop(), numbers.pop(), numbers.pop()));
            }
            operators.push(term);
        } else if (nums.includes(term)) {
            fact = false;
            while (i < input.length && nums.includes(input.charAt(i + 1))) {
                if ((input.charAt(i + 1)) == '!') {
                    fact = true;
                    i += 1;
                    break;
                }
                term += input.charAt(i + 1);
                i += 1;
            }
            if (fact) {
                numbers.push(factorial(Number(term)));
            } else {
                numbers.push(Number(term));
            }
        }
    }
    while (operators.length != 0) {
        numbers.push(calculate(operators.pop(), numbers.pop(), numbers.pop()));

    }
    if (operators.length == 0 && numbers.length == 1) {
        return numbers.pop();
    }

}

function bFirst(a, b) {
    if (b == '(' || a == ')')
        return false;
    if ((a == '*' || a == '/') && (b == '+' || b == '-'))
        return false;
    if ((a == '^') && (b == '+' || b == '-'))
        return false
    if ((a == '^') && (b == '*' || b == '/'))
        return false
    return true;
}

function calculate(operator, term2, term1) {
    switch (operator) {
        case "+":
            return term1 + term2;
        case "-":
            return term1 - term2;
        case "*":
            return term1 * term2;
        case "/":
            return term1 / term2;
        case "^":
            return Math.pow(term1, term2);
    }
}

function factorial(n) {
    if (n < 0)
        return -1
    result = 1;
    for (var i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}



function graph() {
    var input = document.getElementById("equationInput").value;
    canvas = document.getElementById("graph");
    w = canvas.width;
    h = canvas.height;
    grid = canvas.getContext("2d");
    grid.beginPath();
    grid.fillStyle = "#FFFFFF"
    grid.fillRect(0, 0, 400, 400)
    grid.closePath();
    grid.beginPath();
    grid.fillStyle = "#000000"
    grid.moveTo(0, 200);
    grid.lineTo(canvas.width, 200);
    grid.moveTo(200, 0);
    grid.lineTo(200, canvas.height);

    x = (0 / 20.0) - canvas.width / 40;
    y = f(input, x);
    grid.moveTo(0, 20 * (10 - y));
    for (var i = 0; i < canvas.width; i++) {
        x = (i / 20.0) - canvas.width / 40;
        y = f(input, x);
        grid.lineTo(i, 20 * (10 - y));
        grid.moveTo(i, 20 * (10 - y));
    }
    grid.stroke();
    grid.font = "30px Times New Roman";
    grid.fillText("5", canvas.width / 2 + 100, canvas.height / 2);
    grid.fillText("-5", canvas.width / 2 - 100, canvas.height / 2);
    grid.fillText("-5", canvas.width / 2, canvas.height / 2 + 100);
    grid.fillText("5", canvas.width / 2, canvas.height / 2 - 100);
    grid.closePath();
}

function f(userinput, x) {

    if (x < 0) {
        return evaluate(userinput.split('x').join("(0-" + String((-x)) + ")"));
    } else {
        return evaluate(userinput.split('x').join(String(x)));
    }
}
