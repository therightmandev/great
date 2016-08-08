//canvas functions:
canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 300;
document.body.appendChild(canvas);
ctx = canvas.getContext('2d');
ctx.fillStyle = "red";
ctx.strokeStyle = "green";


function newCanvas(width, height) {
	canvas.width = width;
	canvas.height = height;
	ctx.fillStyle = "red";
	ctx.strokeStyle = "red";
}

function rect(x, y, width, height, noFill, stroke) {
	if (!noFill){
		ctx.fillRect(x, y, width, height);
	}
	if (stroke) {
		line(x, y, x + width, y);
		line(x + width, y, x + width, y + width);
		line(x + width, y + width, x, y + width);
		line(x, y + width, x, y);
	}
}

function line(x1, y1, x2, y2) {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}

function ellipse(x, y, r1, r2, noFill, stroke) {
	if (!noFill) {
		ctx.beginPath();
		ctx.ellipse(x, y, r1, r2, 0, 0, Math.PI*2);
		ctx.fill();
	}
	if (stroke) {
		ctx.beginPath();
		ctx.ellipse(x, y, r1, r2, 0, 0, Math.PI*2);
		ctx.stroke();
	}
}

function clear() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function backgroundColor(color) {
	canvas.style.backgroundColor = color;
}

function fillColor(color) {
	ctx.fillStyle = color;
}

function strokeColor(color) {
	ctx.strokeStyle = color;
}


//css reset margin and padding:
elems = document.getElementsByTagName('*');
for (e=0; e<elems.length; e++) {
	elems[e].style.margin = 0;
	elems[e].style.padding = 0;
}