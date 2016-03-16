'use strict';
var designAppControllers = angular.module('designAppControllers',[]);
designAppControllers.controller('homeCtrl',['$scope', '$http', function($scope, $http){
    var vm = this;
}]).controller("workWithUsCtrl", ['$scope', '$http', function($scope, $http){
      var vm = this;
      vm.workWithUs = {};
      $http.get('js/api/home/workwithus.json').success(function(response){
        vm.workWithUs = response;
      });  
      vm.carouselInitializer = function() {
        $(".owl-work-withus").owlCarousel({
          items: 1,
          navigation: true,
          pagination: false,
          navigationText: ["<i class='icon-arrow-thin-left'></i>", "<i class='icon-arrow-thin-right'></i>"],
          itemsDesktop : [1000,1],
          itemsDesktopSmall : [900,1],
          itemsTablet: [600,1]
        });
      };
    }
]).controller('majorWorksCtrl', ['$scope', 'designAppFactory', function($scope, designAppFactory){
      var vm = this;
      vm.work = {};
      designAppFactory.workFtry().success(function(response){
         vm.work = response;
      });
      vm.carouselInitializer = function() {
        $(".owl-major-works").owlCarousel({
          items: 1,
          navigation: false,
          pagination: true,
          itemsDesktop : [1000,1],
          itemsDesktopSmall : [900,1],
          itemsTablet: [600,1]
        });
      };
}]).controller('homeTeamCtrl', ['$scope', '$window','$timeout', 'designAppFactory', function($scope, $window, $timeout, designAppFactory){
    var vm = this;
    vm.teamMembers = {};
    designAppFactory.teamMembersFtry().success(function(response){ 
        vm.teamMembers = response;
    });
    
    $scope.homeTeammembersShow = function(){
        var currentWindow = $window.innerWidth;
        if( currentWindow < 768 ){
            vm.start = 0;
            vm.end = 2;
        }else{
            vm.start = 0;
            vm.end = 3;
        }
    }
    $scope.homeTeammembersShow();
    angular.element($window).on('resize', function () {
        $scope.$apply(function() {
            $scope.homeTeammembersShow();
        });
    });
    vm.next = function(start, end){
        var currentWindow = $window.innerWidth;
        if(currentWindow < 768){
            if( vm.teamMembers.length > vm.end){
                vm.start = start + 2;
                vm.end = end + 2 ;
            }else{
                vm.end = vm.teamMembers.length;
            }  
        }else{
            if( vm.teamMembers.length > vm.end){
                vm.start = start + 3;
                vm.end = end + 3 ;
            }else{
                vm.end = vm.teamMembers.length;
            }
        }
    }
    vm.prev = function(start, end){
        var currentWindow = $window.innerWidth;
        if(currentWindow < 768){
            if( vm.teamMembers.length < vm.end){
                vm.start = start - 2;
                vm.end = end - 2 ;
            }else{
                vm.start = 0;
                vm.end = 2;
            }  
        }else{
            if( vm.teamMembers.length < vm.end){
                vm.start = start - 3;
                vm.end = end - 3 ;
            }else{
                vm.start = 0;
                vm.end = 3;
            }
        }
    }
}]).controller('homeTestimonialCtrl', ['$scope', 'designAppFactory', function($scope, designAppFactory){
      var vm = this;
      vm.carouselInitializer = function() {
        $(".owl-testimonial").owlCarousel({ 
          items: 2,
          navigation: false,
          pagination: true,
          scrollPerPage : false, 
          itemsDesktop : [1000,2],
          itemsDesktopSmall : [900,2],
          itemsTablet: [750,1]
        });
      };
    vm.testimonials = {};
    designAppFactory.testimonialFtry().success(function(response){
        vm.testimonials = response;
    });
}]).controller('workCtrl', ['$scope', '$window', '$timeout',  'designAppFactory', function($scope, $window, $timeout, designAppFactory){
    var vm = this;
    var w = angular.element($window);
    $scope.wOffset = $window.pageYOffset;
    $scope.bnrHeight =  $('.bnr-work').innerHeight();
    //$scope.divOffset = $('.work-filter-panel').offset().top;
    w.bind("scroll", function(){
        $timeout(function() {
            $scope.wOffset = $window.pageYOffset;
            $scope.bnrHeight =  $('.bnr-work').innerHeight();
            //$scope.divOffset = $('.work-filter-panel').offset().top;
        });
    });
}]).controller('casestudyCtrl', ['$scope', '$routeParams', '$location', '$timeout', '$window', 'designAppFactory', function($scope, $routeParams, $location, $timeout, $window, designAppFactory){
    var vm = this;
    var w = angular.element($window);
    var i = 0;
    if( $(window).width() > 700 ){
        var itemWidthHeight = $(window).width()/5;
        $('.case-all-projects li').css({
            "width": itemWidthHeight,
            "height": itemWidthHeight
        });
    }
    // projecting moving animation
    //============================
    function projectMoving(){
        $('.case-all-projects li:first-child').appendTo( $('.case-all-projects') );
    }
    var myTimer = setInterval(projectMoving, 5000);
    
    designAppFactory.workFtry().success(function(response){
        vm.casestudy = response;
        vm.projectNameLocation = $routeParams.id.toLowerCase();
        for ( i=0; i < vm.casestudy.length; i++ ){
            if ( vm.casestudy[i].name.toLowerCase() == vm.projectNameLocation.toLowerCase() ){
                vm.casestudyData = vm.casestudy[i];
                vm.mobC     = vm.casestudyData.primaryColor;
                //finecasestudy project
                //=====================
                if( (i+1) == vm.casestudy.length ){
                    vm.caseEnd =true;
                }else{
                    vm.caseEnd =false;
                } 
                if (  (i+1) == 1 ){
                    vm.caseStart =true;
                }else{
                    vm.caseStart =false;
                }
                break;
            }else{
                if( i == (vm.casestudy.length-1) ){
                    $location.path('/work');
                }
            }
        }
    });
    // show next casestudy
    //====================
    vm.caseNext = function(){
        vm.nextIndex = i + 1 ;
        if( vm.casestudy.length > vm.nextIndex ){
            vm.casestudyData = vm.casestudy[vm.nextIndex];
            vm.nextCasestudyName = vm.casestudyData.name;
            $location.path('casestudy/'+vm.nextCasestudyName);
        }
    }
    // show prev casestudy
    //====================
    vm.casePrev = function(){
        vm.nextIndex = i - 1 ;
        if( 0 <= vm.nextIndex ){
            vm.casestudyData = vm.casestudy[vm.nextIndex];
            vm.nextCasestudyName = vm.casestudyData.name;
            $location.path('casestudy/'+vm.nextCasestudyName);
        }
    }
    vm.screenActive = 'screen-active-mobile';
    vm.currentScreen = function(screen){
        if (screen == 'mobC'){
            vm.mobC     = vm.casestudyData.primaryColor;
            vm.tabC     = '';
            vm.desktopC = '';
        } 
        else if(screen == 'tabC'){
            vm.tabC = vm.casestudyData.primaryColor;
            vm.mobC     = '';
            vm.desktopC = '';
        } 
        else if(screen == 'desktopC'){
            vm.desktopC = vm.casestudyData.primaryColor;
            vm.mobC     = '';
            vm.tabC = '';
        } 
    };
    //casestudy next-prev panel fixed
    //===============================
    $scope.wOffset = $window.pageYOffset;
    $scope.bnrHeight =  $('.bnr-work').innerHeight(); 
    w.bind("scroll", function(){
        $timeout(function() {
            $scope.wOffset = $window.pageYOffset;
            $scope.bnrHeight =  $('.bnr-casestudy').innerHeight();
        });
    });
    
    function InOut( elem ){ 
     elem.delay()
         .fadeIn(1000)
         .delay(3000)
         .fadeOut(500,function(){ 
               if(elem.next().length > 0){
                    InOut( elem.next() );
               }else{
                    InOut( elem.siblings(':first'));
               }
             }
         );
    }

    $(function(){
        $timeout(function() {
            $('.icons-wrap img').hide();
            InOut( $('.icons-wrap img:first') );
        }, 1000);
    });
}]).controller('approachCtrl', ['$scope', '$timeout','$window', function($scope, $timeout, $window){
    var vm = this;
    var w = angular.element($window);
    // approach step fixed
    //====================
    $scope.step = 1;
    $scope.scrollValue = 0;
    $scope.wOffset = $window.pageYOffset;
    $scope.bnrHeight =  $('.bnr-approach').innerHeight();
    w.bind("scroll", function(){
        $timeout(function() {
            $scope.wOffset = $window.pageYOffset;
            $scope.bnrHeight =  $('.bnr-approach').innerHeight();
            //step change
            //===========
            $scope.scrollValue = $window.pageYOffset;
        });
    });
    $scope.approachLaunchAnimation = function(){
        $timeout(function(){
            $('.approach-launch-panel').addClass('launch-animation');
        },1000);
    } 
    
    $scope.stepCount = function(scrollValue){
        $scope.approachMenuHeight = $('.approach-menu-panel').height();
        $scope.minusImageHeight = $('.approach-image-panel').height()/2 + $scope.approachMenuHeight;
        $scope.stepResearch = $('.approach-research-panel').offset().top;
        $scope.stepUX = $('.approach-ux-panel').offset().top;
        $scope.stepUI = $('.approach-ui-panel').offset().top;
        $scope.stepFrontEnd = $('.approach-frontend-panel').offset().top;
        $scope.stepQA = $('.approach-qa-panel').offset().top;
        $scope.stepLaunch = $('.approach-launch-panel').offset().top;
        if ( scrollValue > ($scope.stepLaunch - $scope.minusImageHeight) ){
            $scope.step = 6;
            $scope.moving( $('.approach-menu li.active') );
            return 6;
        }
        if ( scrollValue > ($scope.stepQA - $scope.minusImageHeight) ){
            $scope.step = 5;
            $scope.moving( $('.approach-menu li.active') );
            return 5;
        }
        if ( scrollValue > ($scope.stepFrontEnd - $scope.minusImageHeight) ){
            $scope.step = 4; 
            $scope.moving( $('.approach-menu li.active') );
            return 4;
        }
        if ( scrollValue > ($scope.stepUI - $scope.minusImageHeight) ){
            $scope.step = 3;
            $scope.moving( $('.approach-menu li.active') );
            return 3;
        }
        if ( scrollValue > ($scope.stepUX - $scope.minusImageHeight) ){
            $scope.step = 2;
            $scope.moving( $('.approach-menu li.active') );
            return 2;
        }
        if ( scrollValue > $scope.stepResearch ){
            $scope.step = 1;
            $scope.moving( $('.approach-menu li.active') );
            return 1;
        }else{
            $scope.step = 1;
            $scope.moving( $('.approach-menu li.active') );
            return 1;
        }
    }
    //approach menu scroll on onclick
    //===============================
    $('.approach-menu li').on('click', function(){
        $scope.stepGo = $(this).index() + 1;
        if ( $scope.stepGo == 1 ){
            $("body, html").animate({scrollTop: $scope.stepResearch }, "slow"); 
        }else if ( $scope.stepGo == 2 ){
            $("body, html").animate({scrollTop: $scope.stepUX - $scope.approachMenuHeight }, "slow"); 
        }else if ( $scope.stepGo == 3 ){
            $("body, html").animate({scrollTop: $scope.stepUI - $scope.approachMenuHeight }, "slow"); 
        }else if ( $scope.stepGo == 4 ){
            $("body, html").animate({scrollTop: $scope.stepFrontEnd - $scope.approachMenuHeight }, "slow"); 
        }else if ( $scope.stepGo == 5 ){
            $("body, html").animate({scrollTop: $scope.stepQA - $scope.approachMenuHeight }, "slow"); 
        }else if ( $scope.stepGo == 6 ){
            $scope.approachLaunchAnimation();
            $("body, html").animate({scrollTop: $scope.stepLaunch - $scope.approachMenuHeight }, "slow"); 
        }
        
    });
}]).controller('contactCtrl', [function(){
    
}]);
 



 
