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
      vm.portfolio = {};
      designAppFactory.portfolioFtry().success(function(response){
         vm.portfolio = response;
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
            vm.end = 4;
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
                /*vm.start = 0;*/
                vm.end = vm.teamMembers.length;
            }  
        }else{
            if( vm.teamMembers.length > vm.end){
                vm.start = start + 4;
                vm.end = end + 4 ;
            }else{
                /*vm.start = 0;*/
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
                vm.start = start - 4;
                vm.end = end - 4 ;
            }else{
                vm.start = 0;
                vm.end = 4;
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
}]).controller('portfolioCtrl', ['$scope', '$window', 'designAppFactory', function($scope, $window, designAppFactory){
    var vm = this;
    var w = angular.element($window);
    designAppFactory.portfolioFtry().success(function(response){
        vm.portfolioData = response;
        $scope.portfolioData = response;
    });
    var currentPos = $('.portfolio-filter li.active').position().left;
    var currentWid = $('.portfolio-filter li.active').outerWidth();
    var lessMargin = $('.portfolio-filter li.active').css("marginLeft");
    function moving(){
        $('.portfolio-filter .move').css({
            "left" : currentPos,
            "width": currentWid,
            "margin-left": lessMargin
        });
    }
    $('.portfolio-filter li').hover(function(){
        currentPos = $(this).position().left;
        currentWid = $(this).outerWidth();
        moving();
    });
    $('.portfolio-filter ul').hover(function(){},
    function(){
        currentPos = $('.portfolio-filter li.active').position().left;
        currentWid = $('.portfolio-filter li.active').outerWidth();
        moving();
    });
    $('.portfolio-filter li').on('click', function(){
        $('.portfolio-filter li').removeClass('active');
        $(this).addClass('active');
        moving();
    });
    w.bind("resize", function(){
        currentPos = $('.portfolio-filter li.active').position().left;
        currentWid = $('.portfolio-filter li.active').outerWidth();
        lessMargin = $('.portfolio-filter li.active').css("marginLeft");
        moving();
        console.log('hi');
    });
    $('.portfolio-filter li:first-child').trigger('click');
    
    vm.fixedPortfolioBar = function(){
        $scope.wOffset = $window.pageYOffset;
        $scope.bnrHeight =  $('.bnr-portfolio').innerHeight();
    }
    vm.fixedPortfolioBar();
    w.bind("scroll", function(){
        $scope.$apply(function() {
            vm.fixedPortfolioBar();
        });
        
    });
}])
 



 
