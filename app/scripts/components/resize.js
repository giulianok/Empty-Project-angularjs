'use strict'

class Resize {
	constructor (base) {
		this.win = $(window)
		this.base = ( base === undefined ) ? this.win : base
		this.width = this.base.width()
		this.height = this.base.height()

		setTimeout( () => {
			this.resizing()
		}, 100)

		// If the user resize the window, I recalculate and run the function
		this.win.resize( () => {
			this.width = this.base.width()
			this.height = this.base.height()
			this.resizing()
		})
	}
	resizing () {
	}
}