'use strict'

class Scroll {
	constructor (base) {
		this.win = $(window)
		this.base = ( base === undefined ) ? this.win : base

		setTimeout( () => {
			this.init()
		}, 0)

		// If the user resize the window, I recalculate and run the function
		this.base.scroll( () => {
			this.init()
		})
	}

	init () {
		this.scroll = this.base.scrollTop()
		this.scrollTop = this.scroll
		this.scrollLeft = this.base.scrollLeft()
		this.scrolling()
	}

	scrolling () {
	}
}