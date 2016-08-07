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