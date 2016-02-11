angular.module("ocNgRepeat", []).directive('ngRepeatOwlCarousel', function() {
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
  });
designApp.directive('portfolioDir',  function($window,$timeout){
        return{
            restrict: 'A',
            link: function(scope, element, attrs) {
               scope.portfolioLimit = 5;
               var timer;
                angular.element($window).bind("scroll", function(){
                   var pageHeight   =  $(document).height() - $('footer').height();
                   var scrollAmount =  angular.element($window).scrollTop() + $(window).height();
                   if( pageHeight  < scrollAmount ) {
                        if( scope.portfolioData.length > scope.portfolioLimit ){
                           $('.spinner').show();
                           if ( timer ) $timeout.cancel(timer);
                               timer = $timeout(function(){
                               scope.$apply(function() {
                                    scope.portfolioLimit = scope.portfolioLimit + 5;
                               });
                              $('.spinner').hide();    
                           }, 500);
                       }
                   }
               });
            },
            templateUrl: 'views/portfoliolisting.html'
        }
  });