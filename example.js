function Rocket() {
	this.width = 10;
	this.height = 40;
	this.color = "red";

	this.pos = {
		x: canvas.width/2 - this.width/2,
		y: canvas.height - this.height
	}
}



function setup() {
	gravityOn = true;
	rocket = new Rocket();
	addAnchor(rocket, rocket.width/2, rocket.height);
	addPos(rocket, canvas.width/2, canvas.height);
	addPhysics(rocket);
}

function draw() {
	clear();
	ctx.fillStyle = rocket.color;
	rect(rocket.pos['x'], rocket.pos['y'], rocket.width, rocket.height);
	line(0, 0, rocket.pos['x'], rocket.pos['y']);
	line(0, canvas.height, rocket.pos['x'], rocket.pos['y']+rocket.height);
	line(canvas.width, 0, rocket.pos['x']+rocket.width, rocket.pos['y']);
	line(canvas.width, canvas.height, rocket.pos['x']+rocket.width, rocket.pos['y']+rocket.height);
}

function update() {
	if (spacedown) {
		rocket.color = "blue";
		rocket.vel['y'] = -5;
	}
	if (spaceup) {
		rocket.color = "red";
	}
	if (rightdown) {
		rocket.vel['x'] = 5;
	}
	if (rightup) {
		if (rocket.vel['x']>0) {
			rocket.vel['x'] = 0;
		}
	}

	if (leftdown) {
		rocket.vel['x'] = -5;
	}

	if (leftup) {
		if (rocket.vel['x']<0) {
			rocket.vel['x'] = 0;
		}
	}
}


















function gameLoop() {
	draw();
	update();

	//reset some variables:
	mousemove = false;
	spacedown = false;
	spaceup = false;
	rightup = false;
	rightdown = false;
	leftup = false;
	leftdown = false;

	//handle physics:
	for (o=0; o<withPhysics.length; o++) {
		obj = withPhysics[o];
		//collision prevention:
		if(obj.pos['y'] + obj.height + obj.vel['y'] >= canvas.height) {
			obj.vel['y'] = 0;
		}
		
		//velocity:
		obj.pos['x'] += obj.vel['x'];
		obj.pos['y'] += obj.vel['y'];

		//gravity:
		if(gravityOn) {
			obj.vel['y'] += gravityAcc;
		}
	}

	requestAnimationFrame(gameLoop);
}

setup();
gameLoop();
