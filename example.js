pop = [];
target = vector();
lifespan = 200;
count = 0;

lifeP = document.createElement('p');
document.body.appendChild(lifeP);


map = function(n, start1, stop1, start2, stop2) {
  return ((n-start1)/(stop1-start1))*(stop2-start2)+start2;
};



function Rocket(dna) {
	this.width = 5;
	this.height = 20;
	this.color = "red";
	this.pos = vector(canvas.width/2, canvas.height-this.width);
	this.vel = vector();
	this.acc = vector();
	this.completed = false;

	if(dna!=undefined){
		this.dna = dna;
	} else{
		this.dna = new DNA();
	}
	this.fitness = 0;
	addAnchor(this, this.width/2, this.height/2);

	this.applyForce = function (force) {
		this.acc.add(force);
	}

	this.calcFitness = function() {
		d = dist(this.pos, target);
		this.fitness = map(d, 0, canvas.width, canvas.width, 0);
		if (this.completed) {
			this.fitness *= 10;
		}
	}

	this.mutation = function() {
		for (g=0; g<this.dna.genes.length; g++) {
			randomNumber = Math.random();
			if (randomNumber<0.01){
				this.dna.genes[g] = randomVector();
			}
		}
	}

	this.update = function() {
		d = dist(this.pos, target);
		if (d<10) {
			this.completed = true;
			this.pos = target;
		}

		this.applyForce(this.dna.genes[count]);

		if(!this.completed){
			this.vel.add(this.acc);
			this.pos.add(this.vel);
			this.acc = vector();
		}
	}

	this.show = function() {		
		ctx.fillStyle = this.color;
		ctx.save();
		rotationCenterX = this.pos.x + this.anchor.x;//TODO: fix these anchors
		rotationCenterY = this.pos.y + this.anchor.y;
		ctx.translate(rotationCenterX, rotationCenterY);
		ctx.rotate(this.vel.angle() - (Math.PI/2));
		rect(this.pos.x-rotationCenterX, this.pos.y-rotationCenterY, this.width, this.height);
		ctx.restore();
	}
}

function DNA (genes) {
	if (genes!= undefined){
		this.genes = genes;
	} else {
		this.genes = [];
		for (i=0; i<lifespan; i++) {
			this.genes[i] = randomVector();
		}
	}

	this.crossover = function(partner) {
		newgenes = [];
		mid = Math.floor(Math.random()*this.genes.length)
		for (i=0; i<this.genes.length; i++) {
			if (i<mid) {
				newgenes[i] = this.genes[i];
			} else {
				newgenes[i] = partner.genes[i];
			}
		}
		return new DNA(newgenes);
	}
}

function Population() {
	this.rockets = [];
	this.popsize = 100;
	this.matingPool = [];

	for (r=0; r<this.popsize; r++) {
		rocket = new Rocket();
		this.rockets[r] = rocket;
	}

	this.run = function() {
		for(r=0; r<this.rockets.length; r++) {
			this.rockets[r].show();
			this.rockets[r].update();
		}
	}

	this.evaluate = function() {
		maxFit = 0;
		allFit =  [];
		fitSum = 0;
		for (r=0; r<this.rockets.length; r++) {
			this.rockets[r].calcFitness();
			allFit.push(this.rockets[r].fitness);
			if (this.rockets[r].fitness>maxFit) {
				maxFit = this.rockets[r].fitness;
			}
		}
		for(f=0; f<allFit.length; f++) {
			fitSum += allFit[f];
		}

		p = document.createElement('p');
		document.body.appendChild(p);
		fitAverage = fitSum/allFit.length;
		p.innerHTML = "Average fitness: " + fitAverage;

		for (r=0; r<this.rockets.length; r++) {
			this.rockets[r].fitness /= maxFit;
		}

		this.matingPool = [];
		for (r=0; r<this.rockets.length; r++) {
			n = Math.round(this.rockets[r].fitness * 100);
			for (i=0; i<n; i++) {
				this.matingPool.push(this.rockets[r]);
			}
		}
	}

	this.selection = function() {
		newRockets = [];
		for (r=0; r<this.popsize; r++) {
			randomIndex = Math.floor(Math.random()*(this.matingPool.length));
			parentA = this.matingPool[randomIndex].dna;
			parentB = this.matingPool[randomIndex].dna;
			child = parentA.crossover(parentB);
			newRockets[r] = new Rocket(child);
			newRockets[r].mutation();
		}
		this.rockets = newRockets;
	}
}



function setup() {
	pop = new Population();
	target = vector(canvas.width/2, 50);
}

function draw() {
	clear();
	ellipse(target.x, target.y, 10, 10);

	pop.run();

	lifeP.innerHTML = count;
	count++;
	if(count===lifespan) {
		pop.evaluate();
		pop.selection();
		count = 0;


	}
}


function update() {

}


















function gameLoop() {
	draw();
	update();

	//reset some variables:
	/*mousemove = false;
	spacedown = false;
	spaceup = false;
	rightup = false;
	rightdown = false;
	leftup = false;
	leftdown = false;

	//handle physics:
	for (o=0; o<withPhysics.length; o++) {
		obj = withPhysics[o];
	}*/

	requestAnimationFrame(gameLoop);
}

setup();
gameLoop();
//setInterval(gameLoop, 10);
