import { useEffect } from 'react';
import background from '../../assets/background.jpeg';

export default function Canvas() {
	const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

	useEffect(() => {
		init();
		animate();
	}, []);

	canvas.width = 1232;
	canvas.height = 822;

	const image = new Image();
	image.src = background;
	let scannedData = [];

	image.addEventListener('load', () => {
		ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
		const scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
		scannedData = scannedImage.data;
	});

	let particlesArray = [];
	const numberOfParticles = 150;

	const my_color = (x, y) => {
		let r = scannedData[y * canvas.width * 4 + x * 4];
		let g = scannedData[y * canvas.width * 4 + x * 4 + 1];
		let b = scannedData[y * canvas.width * 4 + x * 4 + 2];
		let color = `rgba(${r},${g},${b})`;
		return color;
	};

	class Particle {
		constructor() {
			this.x = Math.random() * canvas.width;
			this.y = Math.random() * canvas.height; // Could start at 0 if you wanted all rain to intialize at top
			this.speed = 0;
			this.velocity = Math.random() * 10 + 15; // Increase to create a sense of blur and have better idea of image
			this.size = Math.random() * 5 + 1; // Size of "droplets "
		}
		update() {
			this.y += this.velocity;
			this.x += Math.round(Math.random()) * 0.5 - 0.25;
			if (this.y >= canvas.height) {
				this.y = Math.random() * canvas.height;
				this.x = Math.random() * canvas.width;
			}
		}
		draw() {
			ctx.beginPath();
			ctx.fillStyle = my_color(Math.floor(this.x), Math.floor(this.y));
			ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillRect(this.x - this.size, this.y - this.size * 8, this.size * 2, this.size * 8);
			ctx.fill();
		}
	}

	const init = () => {
		for (let i = 0; i < numberOfParticles; i++) {
			particlesArray.push(new Particle());
		}
	};

	const animate = () => {
		ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
		ctx.globalAlpha = .25;
		ctx.fillStyle = 'rgb(0,0,0)';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		for (let i = 0; i < particlesArray.length; i++) {
			particlesArray[i].update();
			particlesArray[i].draw();
		}
		requestAnimationFrame(animate);
	};
	return <canvas id='canvas'/>;
}
