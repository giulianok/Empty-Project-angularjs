
MyApp.config(function($locationProvider, $stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise("/");

	$stateProvider
		.state('welcome', {
			url: "/",
			title: "Empty MyApp",
			description: "dada",
			keywords: [].join(','),
			templateUrl: 'welcome.page.html',
			controller: 'welcome.controller'
		})
	;


	if (window.history && window.history.pushState) {
		if (routeMode === 'friendly') {
			$locationProvider.html5Mode(true);
		}
	}else{
		//window.location.hash = '/'  // IE 9 FIX            
	}

});





