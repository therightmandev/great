//canvas functions:
canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
canvas.style.backgroundColor = "black";
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
gravityOn = false;
gravityAcc = 0.3;

function addAnchor(obj, x, y) {
	obj.anchor = vector(x, y);
}

function addPos(obj, x, y) {
	if (!obj.anchor) {
		obj.pos = vector(x, y);
	} else {
		obj.pos = vector(x - obj.anchor.x, y - obj.anchor.y);
	}

	obj.newPos = function (x, y) {
		if (!this.anchor) {
			this.pos.x = x;
			this.pos.y = y;
		} else {
			this.pos.x = x - this.anchor.x;
			this.pos.y = y - this.anchor.y;
		}
	}
}

function addPhysics(obj) {
	withPhysics.push(obj);
	if(!obj.pos){
		obj.pos = vector();
	}
	if(!obj.vel){
		obj.vel = vector();
	}
}

function gravity(value) {
	gravityAcc = value;
}

//geometry:
function vector(x, y) {
	return new Vector(x, y);
}

function Vector(x, y) {
	if (x && y) {
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

	this.add = function (anotherVector) {
		sum = new Vector(this.x + anotherVector.x, this.y + anotherVector.y);
		return sum;
	}
}

function dist(vect1, vect2) {
	tempVect = vector(
		vect1.x - vect2.x,
		vect1.y - vect2.y
		);
	return tempVect.norm();
}

