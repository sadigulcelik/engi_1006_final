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
    y = f(x);
    grid.moveTo(0, 20 * (10 - y));
    for (var i = 0; i < 20 * canvas.width; i++) {
        x = (i / 20.0) - canvas.width / 40;
        y = x * x;
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

function f(x) {
    return x * x;
}
