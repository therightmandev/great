var box1, box2;

function setup() {
	backgroundColor('#eee');
	newCanvas(1000, 500);
	box1 = new Box(100, 200, 0);
	box2 = new Box(300, 200, Math.PI/6);
}

function draw() {
	box1.display();
	box2.display();
}


function update() {

}

function Box(x, y, angle) {
	this.width = 50;
	this.height = 50;
	this.position = vector(x, y);
	this.angle = angle;

	this.display = function() {
		if (this.angle !== 0) {
			ctx.save();
			ctx.translate(this.position.x + this.width / 2, this.position.y + this.height / 2);
			ctx.rotate(this.angle);
			fillColor("green");
			rect(0 - this.width / 2, 0 - this.height / 2, this.width, this.height);
			fillColor("blue");
			ellipse(0, 0, 10, 10);
			ctx.restore();
		} else {
			fillColor("green");
			rect(this.position.x, this.position.y, this.width, this.height);
		}

		if (this.angle !== 0) {
			ctx.save();
			ctx.translate(this.position.x + this.width / 2, this.position.y + this.height / 2);
			ctx.rotate(this.angle);
			ctx.translate(-(this.position.x + this.width / 2), -(this.position.y + this.height / 2));
		}		
		fillColor("red");
		rect(this.position.x, this.position.y, this.width, this.height);
		if(this.angle !== 0) {
			fillColor("pink");
			ellipse(this.position.x + this.width / 2, this.position.y + this.height / 2, 10, 10);
			ctx.restore();
		}
	}
}
