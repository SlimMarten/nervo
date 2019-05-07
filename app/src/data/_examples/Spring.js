import * as Nervo from "./../../../../src/js/index";
import Canvas from "./Core/Canvas";

class Spring extends Canvas {
	constructor(canvas) {
		super(canvas);

		this.isDragging = false;
		this.springCount = 10;
		this.springs = [];
		this.colors = ["rgba(221,67,107,1)", "#FFEB4F", "#196A99"];

		for (let i = 0; i < this.springCount; i++) {
			const spring = new Nervo.Spring(
				{ x: this.canvas.width / 2, y: this.canvas.height / 2 },
				{},
				{
					stiffness: 0.2,
					damping: 0.8,
					autoStart: false,
					onProgress: e => {
						this.draw();
					},
					onComplete: e => {},
				}
			);

			this.springs.push(spring);
		}

		this.gui.add(this.springs[0], "stiffness").onChange(e => {
			this.springs.forEach(spring => {
				spring.stiffness = e;
			});
		});
		this.gui.add(this.springs[0], "damping").onChange(e => {
			this.springs.forEach(spring => {
				spring.damping = e;
			});
		});

		this.initEvents();
		this.draw();
	}

	initEvents = e => {
		window.addEventListener("resize", this.setSpringTargetToCenter);
		this.canvas.addEventListener("mouseleave", this.onMouseLeaveOrUp);
		this.canvas.addEventListener("mouseup", this.onMouseLeaveOrUp);
		this.canvas.addEventListener("mousedown", this.onMouseDown);
		this.canvas.addEventListener("mousemove", this.onMouseMove);
	};

	onMouseDown = e => {
		this.updateMousePosition(e);
		this.isDragging = true;
	};

	onMouseMove = e => {
		if (!this.isDragging) return;
		this.updateMousePosition(e);
	};

	onMouseLeaveOrUp = e => {
		if (this.isDragging) this.setSpringTargetToCenter();
		this.isDragging = false;
	};

	setSpringTargetToCenter = e => {
		this.springs[0].setTarget({
			x: this.canvas.width / 2,
			y: this.canvas.height / 2,
		});
	};

	updateMousePosition = e => {
		const canvasBoundingBox = e.target.getBoundingClientRect();

		for (let i = 0; i < this.springs.length; i++) {
			if (i === 0) {
				this.springs[i].setTarget({
					x: e.clientX - canvasBoundingBox.left,
					y: e.clientY - canvasBoundingBox.top,
				});
			} else {
				this.springs[i].setTarget(this.springs[i - 1].object);
			}
		}
	};

	draw = e => {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		// ellipse
		for (let i = 0; i < this.springs.length; i++) {
			// this.context.fillStyle =
			// 	this.springs.length - i - 1 === 0 ? "rgba(221,67,107,1)" : "rgba(20,23,48,0.75)";
			this.context.fillStyle = this.colors[i % 3];
			this.context.beginPath();
			this.context.arc(
				this.springs[this.springs.length - i - 1].object.x,
				this.springs[this.springs.length - i - 1].object.y,
				this.radius,
				0,
				2 * Math.PI,
				false
			);
			this.context.fill();
		}

		// text
		this.context.font = `${0.3 * this.radius}px Roboto Black Italic`;
		this.context.textAlign = "center";
		this.context.textBaseline = "middle";
		this.context.fillStyle = "#FFEB4F";
		this.context.textAlign = "center";
		this.context.fillText("DRAG ME!", this.springs[0].object.x, this.springs[0].object.y);
	};
}

export default Spring;