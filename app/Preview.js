class Preview {
	constructor({url, page, fixedWidth, height}) {
		this._url = url;
		this._height = height * (window.innerWidth / 2) / 200;

		this._boundCopyClicked = this._handleCopyClicked.bind(this);
		this._boundImageError = this._handleImageError.bind(this);

		this._copyLink = Element.create(
			"a",
			{
				class: "copy",
				href: this._url,
				title: "Copy Link",
				target: "_blank",
			}
		);

		this._pageLink = Element.create(
			"a",
			{
				class: "open",
				href: page,
				title: "Open Giphy",
				target: "_blank",
			}
		);

		this._image = Element.create(
			"img",
			{
				src: fixedWidth
			}
		);

		this._element = Element.create(
			"div",
			{
				class: "preview",
			},
			this._image,
			Element.create(
				"div",
				{
					class: "options"
				},
				this._copyLink,
				this._pageLink
			)
		);
	}

	get height() {
		if (!this._height)
			this._height = this._element.offsetHeight;

		return this._height;
	}

	show(container, offset, side) {
		this._copyLink.addEventListener("click", this._boundCopyClicked);
		this._image.addEventListener("error", this._boundImageError);

		this._element.style.setProperty("top", `${offset}px`);

		switch (side) {
		case Preview.Side.Right:
			this._element.style.setProperty("right", 0);
			break;
		case Preview.Side.Left:
			this._element.style.setProperty("left", 0);
			break;
		}

		container.appendChild(this._element);
	}

	hide() {
		this._element.remove();

		this._copyLink.removeEventListener("click", this._boundCopyClicked);
		this._image.removeEventListener("error", this._boundImageError);
	}

	_handleCopyClicked(event) {
		event.preventDefault();
		this._url.copy();
	}

	_handleImageError(event) {
		this._image.setAttribute("src", this._image.getAttribute("src"));
	}
}

Preview.Side = {
	Right: Symbol("preview-side-right"),
	Left:  Symbol("preview-side-left"),
};
