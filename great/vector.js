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