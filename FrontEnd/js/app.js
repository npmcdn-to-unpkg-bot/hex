var designApp = angular.module('designApp', ['ui.router', 'ngAnimate', 'designAppControllers', 'designAppDrirectives']);
designApp.config(['$stateProvider', '$urlRouterProvider','$animateProvider', function($stateProvider, $urlRouterProvider, $animateProvider){
    $urlRouterProvider.otherwise("/");
    $stateProvider
        .state('root',{
            url: "",
            abstract: true,
            views:{
                'header':{
                    templateUrl: 'views/header.html',
                    controller: 'headerCtrl',
                    controllerAs: 'header'
                },
                'footer':{
                    templateUrl: 'views/footer.html'
                }
            },
        }).state('root.home',{
            url: "/",
            views:{
                'content@': {
                    templateUrl: "views/home.html",
                    controller : "homeCtrl",
                    controllerAs: "home"
                },
                'bannerHome@': {
                    templateUrl: 'views/banner/bnr-home.html'
                } 
            }
        }).state('root.work',{
            url: '/work',
            views: {
                'content@':{
                    templateUrl: "views/work.html",
                    controller : "workCtrl",
                    controllerAs: "work"
                },
                'bannerInner@': {
                    templateUrl: 'views/banner/bnr-work.html'
                }
            }
        }).state('root.casestudy',{
            url: '/casestudy/:id',
            views: {
                'content@':{
                    templateUrl: "views/casestudy.html",
                    controller : "casestudyCtrl",
                    controllerAs: "casestudy"
                },
                  'bannerInner@': {
                    templateUrl: "views/banner/bnr-casestudy.html",
                    controller: "caseBannerCtrl",
                    controllerAs: "caseBanner"
                }
            }
        }).state('root.approach',{
            url: '/approach',
            views: {
                'content@':{
                    templateUrl: "views/approach.html",
                    controller : "approachCtrl",
                    controllerAs: "approach"
                },
                'bannerInner@': {
                    templateUrl: "views/banner/bnr-approach.html"
                }
            }
        }).state('root.about',{
            url: '/about',
            views: {
                'content@':{
                    templateUrl: "views/about.html",
                    controller : "aboutCtrl",
                    controllerAs: "about"
                },
                'bannerInner@': {
                    templateUrl: "views/banner/bnr-about.html"
                }
            }
        }).state('root.contact',{
            url: '/contact',
            views: {
                'content@':{
                    templateUrl: "views/contact.html",
                    controller : "contactCtrl",
                    controllerAs: "contact"
                },
                'bannerInner@': {
                    templateUrl: 'views/banner/bnr-contact.html'
                }
            }
        })
    
    $animateProvider.classNameFilter(/angular-animate/)
}])

designApp.run(['$rootScope', '$stateParams', '$location', '$window', '$timeout', function($rootScope, $stateParams, $location, $window, $timeout){
    
    var w = angular.element($window); 
    $rootScope.$on('$stateChangeStart',function(){
        window.scrollTo(0,0);
        $('.main-logo').addClass('logo-animate');
        //find mobile screen or desktopscreen
        //===================================
        $rootScope.responsiveScreen = function(){
            if ($window.innerWidth < 768){
                $rootScope.mobileScreen = true;
                $rootScope.desktopScreen = false;
            }else{
                $rootScope.mobileScreen = false;
                $rootScope.desktopScreen = true;
            }
        }
        $rootScope.responsiveScreen();
         
        // banner class adding
        //====================
        $rootScope.pageName = $location.path().split('/')[1];
        if($rootScope.pageName == ''){
            $rootScope.bannerWrapHome = true;
            $rootScope.pageState = true;
            //console.log($rootScope.bannerWrapHome);
        }else{
            $rootScope.bannerWrapHome = false;
            $rootScope.pageState = false;
            //console.log($rootScope.bannerWrapHome);
        }
       
        //state change-innerToHome loader added
        //==========================
        
        if( $rootScope.existingState == null ){
            $rootScope.stateChangeInnerHome = $rootScope.pageState;
        }else{
            if( $rootScope.pageState == $rootScope.existingState ){
                }else{
                    if($rootScope.existingState){
                        $rootScope.stateChangeInnerHome = false;
                    }else{
                        $rootScope.stateChangeInnerHome = true;
                    }
                } 
        }
        
        //state keep
        //==========
        $rootScope.existingState = $rootScope.pageState;
         
     });
    $rootScope.$on('$stateChangeSuccess', function(){
        $rootScope.contactShow = false;
        $rootScope.pageName = $location.path().split('/')[1];
        $timeout(function(){
            $('.main-logo').removeClass('logo-animate');
        },1000);
        
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
                     $('body, html').animate({scrollTop: currentScrollTop},0);
                }else{
                    $rootScope.contactShow = true;
                    currentScrollTop = $(window).scrollTop();
                    $('body, html').animate({scrollTop: 0},0);
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
        $rootScope.bannerArea = $('.banner-wrap').innerHeight() - $('.main-logo').innerHeight();
        w.bind("scroll", function(){
            $timeout(function() {
                $rootScope.bannerArea = $('.banner-wrap').innerHeight() - $('.main-logo').innerHeight();
                $rootScope.wOffset = $window.pageYOffset 
            });
        });
    });
    
    $(window).on('resize', function(){
        $rootScope.responsiveScreen();
        $rootScope.$digest();
    });
}])


 