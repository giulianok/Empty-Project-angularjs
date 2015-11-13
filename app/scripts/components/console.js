if( console === undefined || console.log === undefined ){
	var console = {};
	console.log = function () {
		return;
	};
}