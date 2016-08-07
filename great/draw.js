//canvas functions:
canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 300;
canvas.style.backgroundColor = "#eee";
document.body.appendChild(canvas);
ctx = canvas.getContext('2d');
ctx.fillStyle = "red";
ctx.strokeStyle = "red";


function rect(x, y, width, height) {
	ctx.fillRect(x, y, width, height);
}

function line(x1, y1, x2, y2) {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}

function ellipse(x, y, r1, r2) {
	ctx.beginPath();
	ctx.ellipse(x, y, r1, r2, 0, 0, Math.PI*2);
	ctx.stroke();
}

function clear() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}


//css reset margin and padding:
elems = document.getElementsByTagName('*');
for (e=0; e<elems.length; e++) {
	elems[e].style.margin = 0;
	elems[e].style.padding = 0;
}