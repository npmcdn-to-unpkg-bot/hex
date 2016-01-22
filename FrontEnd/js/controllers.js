'use strict';
var designAppControllers = angular.module('designAppControllers',[]);
designAppControllers.controller('homeCtrl',['$scope', '$http', function($scope, $http){
    var vm = this;
    vm.items = [1,2,3,4,5];
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
}]).controller('homeTeamCtrl', ['designAppFactory', function(designAppFactory){
    var vm = this;
    vm.teamMembers = {};
    designAppFactory.teamMembersFtry().success(function(response){ 
        vm.teamMembers = response;
        console.log(vm.teamMembers[0].name);
    });
}]);
 



 
