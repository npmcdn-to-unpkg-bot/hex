var designApp = angular.module('designApp', ['ngRoute', 'ocNgRepeat', 'ngAnimate', 'designAppControllers']);
 
designApp.config(['$routeProvider', '$animateProvider', function($routeProvider, $animateProvider){
    $routeProvider.
    when('/',{
        templateUrl: 'views/home.html',
        controller : 'homeCtrl',
        controllerAs: 'home'
    }).when('/portfolio',{
        templateUrl: 'views/portfolio.html',
        controller: 'portfolioCtrl',
        controllerAs: 'portfolio'
    }).otherwise(
        {redirectTo:'/'}
    )
    $animateProvider.classNameFilter(/angular-animate/)
}]); 

designApp.run(['$rootScope', '$location', function($rootScope, $location){
    $rootScope.$on('$routeChangeSuccess', function(){
        $rootScope.pageName = $location.path().split('/')[1];
        if($rootScope.pageName){
            $rootScope.banner = 'views/banner/bnr-' + $rootScope.pageName + '.html';
        }else{
            $rootScope.banner = 'views/banner/bnr-home.html';
        }
    });
}])


 