'use strict';
var designAppControllers = angular.module('designAppControllers',[]);
designAppControllers.controller('homeCtrl',['$scope', '$http', function($scope, $http){
    var vm = this;
}]).controller("workWithUsCtrl", ['$scope', '$http', function($scope, $http){
      var vm = this;
      vm.workWithUs = {};
      $http.get('js/api/home/workwithus.json').success(function(data){
        vm.workWithUs = data;
      });  
      vm.carouselInitializer = function() {
        $(".workwithus-carousel").owlCarousel({
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
]).controller('majorWorksCtrl', ['$scope', '$http', function($scope, $http){
      var vm = this;
      vm.portfolio = {};
      $http.get('js/api/common/portfolio.json').success(function(data){
          vm.portfolio = data;
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
}]);
 



 
