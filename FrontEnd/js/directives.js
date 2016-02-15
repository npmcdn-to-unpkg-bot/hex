var designAppDrirective = angular.module('designAppDrirectives',[]);
designAppDrirective.directive('ngRepeatOwlCarousel', function() {
    return {
      restrict: 'A',
      scope: {
        carouselInit: '&'
      },
      link: function(scope, element, attrs) {
        if ((scope.$parent != null) && scope.$parent.$last) {
          return scope.carouselInit()();
        }
      }
    };
  }).directive('portfolioDir',  ['$window', '$timeout', 'designAppFactory', function($window,$timeout,designAppFactory){
        return{
            restrict: 'A',
            link: function(scope, element, attrs) {
               scope.portfolioLimit = 5;
               var timer;
                designAppFactory.portfolioFtry().success(function(response){
                   scope.portfolioData = response;
                }).finally(function(){
                    scope.scrollBottomEnd();
                });
                //scrollBottom
                scope.scrollBottomEnd = function(){
                    angular.element($window).bind("scroll", function(){
                       var pageHeight   =  $(document).height() - $('footer').height();
                       var scrollAmount =  angular.element($window).scrollTop() + $(window).height();
                       if( pageHeight  < scrollAmount ) {
                            if( scope.portfolioData.length > scope.portfolioLimit ){
                               $('.spinner').show();
                               if ( timer ) $timeout.cancel(timer);
                                   timer = $timeout(function(){
                                        scope.portfolioLimit = scope.portfolioLimit + 5;
                                  $('.spinner').hide();    
                               }, 500);
                           }
                       }
                   });
               };
            },
            templateUrl: 'views/portfoliolisting.html'
        }
}]).directive('bannerDir', ['$rootScope', '$location', '$routeParams', function($rootScope, $location, $routeParams){
    return{
        restrict: 'A',
        //templateUrl: 'views/banner/bnr-' + $rootScope.pageName + '.html',
        link: function(scope, element, attrs){
            console.log($location.path().split('/')[1]);
            $rootScope.$on('$routeChangeSuccess', function(){
                $rootScope.pageName = $location.path().split('/')[1];
                $rootScope.casestudyName = $routeParams.id;
                console.log($rootScope.pageName);
                    if($rootScope.pageName){
                        $rootScope.banner = 'views/banner/bnr-' + $rootScope.pageName + '.html';
                    }else{
                        $rootScope.banner = 'views/banner/bnr-home.html';
                    }
            });
        }
    }
}])