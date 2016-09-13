window.onload = function() {
	if (typeof setup === 'function' &&
		typeof draw === 'function' &&
		typeof update === 'function') {
		function gameLoop() {
			draw();
			update();

			mousemove = false;
			spaceup = false;
			spacedown = false;
			spaceok = true;
			rightdown = false;
			rightup = false;
			rightok = true;
			leftdown = false;
			leftup = false;
			leftok = true;
			requestAnimationFrame(gameLoop);
		}
		setup();
		gameLoop();
	}
}