'use strict'

class Modal {
	constructor (settings) {
		this.default = {
			url: 'http://www.google.com',
			type: 'iframe',
			maxWidth: '600px',
			maxHeight: '300px'
		}
		$.extend(this.default, settings);
	}

	open () {
		if( $('#modal').length ){
			alert('You can not open a new modal because there is one opened')
			return
		}

		let content = `<iframe src="${this.default.url}"></iframe>`

		$('body').append(`
			<div id="modal">
				<div class="vaMiddle">
					<div class="vaContent">
						<div class="content" style="width:${this.default.maxWidth}; height:${this.default.maxHeight};">
							${content}
						</div>
					</div>
				</div>
				<div class="close"></div>
			</div>
		`)

		$('#modal').fadeIn(700)
	}

	close () {
		$('#modal').fadeIn(700, function () {
			$('#modal').remove()
		})
	}
}