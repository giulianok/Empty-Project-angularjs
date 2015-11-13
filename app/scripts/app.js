'use strict';


var routeMode = 'friendly';
routeMode = 'hash';


var MyApp = angular.module('EmptyApp', [
    'ui.router'
]);


MyApp.run(function ($location, $rootScope) {
	$rootScope.$on('$stateChangeSuccess', function (event, current, previous) {
		$rootScope.page = {}
        $rootScope.page.name = 'Empty Project'
        $rootScope.page.title = (current.title) ? current.title : $rootScope.page.name
        $rootScope.page.description = current.description
        $rootScope.page.keywords = current.keywords
        $rootScope.page.url = $location.$$absUrl
        $rootScope.page.url_base = $location.$$protocol + '://' + $location.$$host
        $rootScope.page.path = $location.$$path
        $rootScope.page.host = $location.$$host

        if (window.history && window.history.pushState) {
			$rootScope.page.url_path = (routeMode === 'friendly') ? '' : 'index.html#';
		}else{
			$rootScope.page.url_path = 'index.html#'
		}

    });

});

