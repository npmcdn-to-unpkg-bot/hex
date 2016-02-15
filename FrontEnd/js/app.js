var designApp = angular.module('designApp', ['ngRoute', 'ngAnimate', 'designAppControllers', 'designAppDrirectives']);
 
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
    }).when('/casestudy/:id',{
        templateUrl: 'views/casestudy.html',
        controller: 'casestudyCtrl',
        controllerAs: 'casestudy'
    }).otherwise(
        {redirectTo:'/'}
    )
    $animateProvider.classNameFilter(/angular-animate/)
}]); 

/*designApp.run(['$rootScope', '$location', '$routeParams', function($rootScope, $location, $routeParams){
    $rootScope.$on('$routeChangeSuccess', function(){
        $rootScope.pageName = $location.path().split('/')[1];
        $rootScope.casestudyName = $routeParams.id;
            if($rootScope.pageName){
                $rootScope.banner = 'views/banner/bnr-' + $rootScope.pageName + '.html';
            }else{
                $rootScope.banner = 'views/banner/bnr-home.html';
            }
    });
}])*/


 