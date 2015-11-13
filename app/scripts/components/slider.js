'use strict'

class Slider {

	constructor (slider) {
		this.slider = (slider) ? slider : $('.slider')
		this.slides = this.slider.children('.slides')
		this.sliderBase = this.slides.children('ul')
		this.sections = this.sliderBase.find('li')
		this.total = this.sections.length
		this.active = 1 // the first slide is active for default

		let rez = new Resize()
		rez.resizing = () => {
			this.sections.innerWidth( this.slider.width() )
			this.onMove()
		}

		this.init()

	}

	init () {
		if( this.total > 1 ){
			
			// Creating the bullets
			this.slider.append(`<div class="pagination"><ul></ul></div>`)
			this.pagination = this.slider.find('.pagination ul')

			// Creating the arrows
			this.slider.append(`<div class="arrow-slide prev"></div>`)
			this.slider.append(`<div class="arrow-slide next"></div>`)
			this.arrow = this.slider.find('.arrow-slide')


			// Adding bullets into the pagination
			for(let i=1; i<=this.total; i++){
				let addClass = (i == 1) ? 'active' : ''
				this.pagination.append(`<li class="${addClass}"></li>`)
			}

			this.onPagination()

		}
	}

	onPagination () {
		let self = this
		this.pagination.find('li').on('click', function () {
			let $this = $(this)
			if( !$this.hasClass('active') ){
				self.active = $this.index()+1
				self.onMove()
			}
		})
		this.arrow.on('click', function () {
			let $this = $(this)
			let actualSlide = parseInt(self.sliderBase.find('li.active').index()) + 1
			if( $this.hasClass('prev') ){
				self.active = ( actualSlide-1 < 1 ) ? self.total : actualSlide-1
			}else{
				self.active = ( actualSlide+1 > self.total ) ? 1 : actualSlide+1
			}
			self.onMove()
		})
	}

	onMove () {
		// Cleaning bullets 
		if( this.pagination ){
			this.pagination.find('li').removeClass('active')
		}
		this.sliderBase.find('li').removeClass('active')

		if( this.pagination ){
			this.pagination.find(`li:nth-child(${this.active})`).addClass('active')
		}
		this.sliderBase.find(`li:nth-child(${this.active})`).addClass('active')

		let move = (this.slider.width() * (this.active-1))
		//this.setTransform(this.sliderBase, `translateX(${move}px)`)

		this.slides.stop().animate({
			scrollLeft: move
		}, 1000);

	}

	// setTransform (elem, value) {
	// 	elem.css({
	// 		'-moz-transform': value,
	// 		'-ms-transform': value,
	// 		'-webkit-transform': value,
	// 		'transform': value
	// 	})
	// }

}