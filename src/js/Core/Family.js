const packageConfig = require("./../../../package.json");
const libName = packageConfig.name.charAt(0).toUpperCase() + packageConfig.name.slice(1);
import { readonly } from "./Decorators";
const uuid = require("uuid/v4");
import Root from "./Root";

export default class Family extends Root {
	constructor(options) {
		super(options);
		this.children = [];
		this.parent = null;
	}

	@readonly
	clone = () => {
		const clone = Object.assign(Object.create(Object.getPrototypeOf(this)), this);
		Object.defineProperty(clone, "uuid", {
			value: uuid(),
			writable: false,
		});
		Root.Instances.push(clone);
		return clone;
	};

	@readonly
	add = (object, options = {}) => {
		if (object.length >= 1) {
			if (this.isTimeline) {
				const tweens = [];
				for (let i = 0; i < object.length; i++) {
					if (object[i].isTween) tweens.push(object[i]);
					if (object[i].isTrack) this.add(object[i], {});
				}
				const track = this._getTrackFromTweens(tweens, options);
				this.add(track, options);
				return this;
			}

			for (let i = 0; i < object.length; i++) {
				this.add(object[i]);
			}
			return this;
		}

		if (object === this) {
			console.error(`${libName}.Base.add: Object can't be a child of itself.`, object);
			return this;
		}

		if (object && object.isNervo) {
			if (this.isTween || this.isSpring) {
				console.warn(
					`${libName}.Base.add: Object is an instance of ${libName}.Tween or ${libName}.Spring and can't have children.`,
					object
				);
				return this;
			}

			if (object.parent !== null) {
				object.parent.remove(object);
			}

			if (this.isTimeline) {
				if (!object.isTween && !object.isTrack) {
					console.error(
						`${libName}.Base.add: Object is not an instance of ${libName}.Tween or ${libName}.Track.`,
						object
					);
					return this;
				}
			}

			if (this.isTrack) {
				if (object.isTimeline || object.isSpring) {
					console.error(
						`${libName}.Base.add: Can't add object of type ${object.type} to a Track.`,
						object
					);
					return this;
				}
			}

			object.parent = this;
			this.children.push(object);

			object.dispatchEvent({ type: "added" });

			this._onChildChange();
		} else {
			console.error(
				`${libName}.Base.add: Object is not an instance of ${libName}.Base.`,
				object
			);
		}
		return this;
	};

	@readonly
	remove = object => {
		if (object.length > 1) {
			for (let i = 0; i < object.length; i++) {
				this.remove(object[i]);
			}

			return this;
		}

		const index = this.children.indexOf(object);

		if (index !== -1) {
			object.parent = null;
			object.dispatchEvent({ type: "removed" });

			this.children.splice(index, 1);
			this._onChildChange();
		}

		return this;
	};

	@readonly
	_onChildChange = e => {
		if (this.isTimeline || this.isTrack) {
			this._updateDuration();
		}
	};

	@readonly
	_updateChildrenByTime = t => {
		this.children.forEach(child => {
			child._update(t);
		});
	};
}