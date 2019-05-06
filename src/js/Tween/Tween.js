import { readonly } from "./../Core/Decorators";
import Ticker from "./../Core/Ticker";

export default class Tween extends Ticker {
	@readonly
	isTween = true;

	@readonly
	type = "Tween";

	constructor(object, target, options = {}) {
		super(options);

		this.target = target;
		this.object = object;
		this._reference = { ...{}, ...this.object };
		if (this.autoStart) this.start();
	}

	@readonly
	setDuration = duration => {
		this.duration = duration;

		if (this.parent) {
			this._onChildChange(this.parent);
		}
	};

	@readonly
	_execute = e => {
		for (const key in this.target) {
			this.object[key] =
				this._reference[key] +
				(this.target[key] - this._reference[key]) * this.easedProgress;
		}
	};
}
