var designApp = angular.module('designApp', ['ngRoute', 'ngAnimate', 'designAppControllers', 'designAppDrirectives']);
 
designApp.config(['$routeProvider', '$animateProvider', function($routeProvider, $animateProvider){
    $routeProvider.
    when('/',{
        templateUrl: 'views/home.html',
        controller : 'homeCtrl',
        controllerAs: 'home'
    }).when('/work',{
        templateUrl: 'views/work.html',
        controller: 'workCtrl',
        controllerAs: 'work'
    }).when('/casestudy/:id',{
        templateUrl: 'views/casestudy.html',
        controller: 'casestudyCtrl',
        controllerAs: 'casestudy'
    }).when('/approach',{
        templateUrl: 'views/approach.html',
        controller: 'approachCtrl',
        controllerAs: 'approach'
    }).when('/contact',{
        templateUrl: 'views/contact.html',
        controller : 'contactCtrl',
        contact : 'contact'
    }).when('/about',{
        templateUrl: 'views/about.html',
        controller : 'aboutCtrl',
        controllerAs : 'about'
    }).otherwise(
        {redirectTo:'/'}
    )
    $animateProvider.classNameFilter(/angular-animate/)
}]); 
 
 
designApp.run(['$rootScope', '$routeParams', '$location', '$window', '$timeout', function($rootScope, $routeParams, $location, $window, $timeout){
    //$rootScope.$on('$routeChangeSuccess', function(){
        var w = angular.element($window); 
        $rootScope.contactShow = false;
        $rootScope.pageName = $location.path().split('/')[1];
    
        // contact page popup or page find
        //================================
        $rootScope.contact =  function(){
            if($rootScope.pageName == 'contact'){
                $('html, body').animate({
                    scrollTop: $('.inner-banner').innerHeight() 
                });
            }else{
                 if ($rootScope.contactShow){
                    $rootScope.contactShow = false;
                }else{
                    $rootScope.contactShow = true;
                }
            }
        };
        
        // adding active class on selected menu
        //=====================================
        $rootScope.menuClass = function(path){
            if (path ===  $rootScope.pageName){
                return 'active';
            }else{
                return '';
            }
        }
        
        //menu fixed on scroll
        //======================
        $rootScope.wOffset = $window.pageYOffset;
        $rootScope.bannerArea = $('.banner-wrap').innerHeight() 
        w.bind("scroll", function(){
            $timeout(function() {
                $rootScope.bannerArea = $('.banner-wrap').innerHeight() 
                $rootScope.wOffset = $window.pageYOffset 
            });
        });
        
         
    //});
}])


 