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


//input handlers:
mousemove = false;
mouseX = 0;
mouseY = 0;
spaceup = false;
spacedown = false;
spaceok = true;
rightdown = false;
rightup = false;
rightok = true;
leftdown = false;
leftup = false;
leftok = true;


document.addEventListener('mousemove', mouseMoveHandler);
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function mouseMoveHandler(e) {
	mousemove = true;
	mouseX = e.clientX;
	mouseY = e.clientY;
}

function keyDownHandler(e) {
	if (e.keyCode === 32) {
		if(spaceok) {
			spacedown = true;
			spaceok = false;
		}
	}
	if (e.keyCode === 39) {
		if (rightok) {
			rightdown = true;
			rightok = false;
		}
	}
	if (e.keyCode === 37) {
		if (leftok) {
			leftdown = true;
			leftok = false;
		}
	}
}

function keyUpHandler(e) {
	if (e.keyCode === 32) {
		spaceup = true;
		spaceok = true;
	}
	if (e.keyCode === 39) {
		rightup = true;
		rightok = true;
	}
	if (e.keyCode === 37) {
		leftup = true;
		leftok = true;
	}
}


//object plugins:
withPhysics = [];

function addAnchor(obj, x, y) {
	obj.anchor = vector(x, y);
}


//geometry:
function vector(x, y) {
	return new Vector(x, y);
}

function randomVector() {
	//create a random vector with norm = 1
	angle = Math.random() * Math.PI*2;
	x = Math.cos(angle);
	y = Math.sin(angle);
	return new Vector(x, y);

}

function Vector(x, y) {
	if (x!=undefined && y!=undefined) {
		this.x = x;
		this.y = y;
	} else {
		this.x = 0;
		this.y = 0;
	}

	this.norm = function() {
		norm = Math.sqrt(this.x*this.x + this.y*this.y);
		return norm;
	}

	this.angle = function() {
		angle = Math.atan2(this.y, this.x);
		return angle;
	}

	this.add = function (anotherVector) {
		this.x += anotherVector.x;
		this.y += anotherVector.y;
	}
}

function dist(vect1, vect2) {
	tempVect = vector(
		vect1.x - vect2.x,
		vect1.y - vect2.y
		);
	return tempVect.norm();
}

