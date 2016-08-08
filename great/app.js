window.onload = function() {
	if (typeof setup === 'function' &&
		typeof draw === 'function' &&
		typeof update === 'function') {
		function gameLoop() {
			draw();
			update();
			requestAnimationFrame(gameLoop);
		}
		setup();
		gameLoop();
	}
}