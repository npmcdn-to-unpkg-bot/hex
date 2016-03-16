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
  }).directive('workDir',  ['$window', '$timeout', 'designAppFactory', function($window,$timeout,designAppFactory){
        return{
            restrict: 'A',
            link: function(scope, element, attrs) {
               scope.workLimit = 5;
               var timer;
                designAppFactory.workFtry().success(function(response){
                   scope.workData = response;
                }).finally(function(){
                    scope.scrollBottomEnd();
                });
                //scrollBottom
                //============
                scope.scrollBottomEnd = function(){
                    angular.element($window).bind("scroll", function(){
                       var pageHeight   =  $(document).height() - $('footer').height();
                       var scrollAmount =  angular.element($window).scrollTop() + $(window).height();
                       if( pageHeight  < scrollAmount ) {
                            if( scope.workData.length > scope.workLimit ){
                               $('.spinner').show();
                               if ( timer ) $timeout.cancel(timer);
                                   timer = $timeout(function(){
                                        scope.workLimit = scope.workLimit + 5;
                                  $('.spinner').hide();    
                               }, 500);
                           }
                       }
                   });
               };
            },
            templateUrl: 'views/worklisting.html'
        }
}]).directive('bannerDir', ['$rootScope', '$location', '$routeParams', function($rootScope, $location, $routeParams){
    return{
        restrict: 'A',
        link: function(scope, element, attrs){
            $rootScope.$on('$routeChangeSuccess', function(){
                $rootScope.pageName = $location.path().split('/')[1];
                $rootScope.casestudyName = $routeParams.id;
                    if($rootScope.pageName){
                        $rootScope.banner = 'views/banner/bnr-' + $rootScope.pageName + '.html';
                    }else{
                        $rootScope.banner = 'views/banner/bnr-home.html';
                    }
            });
        }
    }
}]).directive('screenDir', [function(){ 
    return{
        restrict: 'A'
    }
}]).directive('approachImageDir', ['$timeout', '$interval', function($timeout,$interval){
    return{
        restrict: 'A',
        link: function(scope, element, attrs){
            //approach full width back image banner 
            //================================
             scope.moveItem = function(elem){
                 if(typeof window.orientation == 'undefined'){
                    elem.delay(1000)
                    .appendTo( $(elem).parent() );
                 }   
            }
            $(function(){
                $timeout(function(){
                    scope.moveItem( element.find('.image-back ul li:first') );
                },0);
                $interval(function() {
                    scope.moveItem( element.find('.image-back ul li:first') );
                }, 10000);
            });
            //approach full width front image banner 
            //================================
            function InOut( elem ){
              if(typeof window.orientation == 'undefined'){
                  if ( element.find('.image-front li.current').next().length > 0 ){
                     element.find('.image-front li.current').removeClass('current').next().addClass('current');
                  }else{
                    element.find('.image-front li.current').removeClass('current');
                    element.find('.image-front li:first-child').addClass('current');
                  }
                }
            }
            $(function(){
                $interval(function() {
                    InOut();
                }, 10000);
            });
        }
    }
}]).directive('movingDir',['$timeout', '$window', function($timeout, $window){
    var w = angular.element($window);
    return{
        restrict: 'A',
        controller: function ($scope){
            $scope.moving = function(element){
                $('.move').css({
                    "left" : element.position().left, 
                    "width": element.outerWidth(), 
                    "margin-left": element.css("marginLeft")
                });
            }
            $('.work-filter li, .approach-menu li').hover(function(){
                $scope.moving( $(this) );
            });
            $('.work-filter ul, .approach-menu ul').hover(function(){},
            function(){
                $scope.moving( $(this).find('li.active') );
            });
            $('.work-filter li').on('click', function(){
                $(this).parent().find('li').removeClass('active');
                $(this).addClass('active');
                $scope.moving( $(this) );
            });
            w.bind("resize", function(){
                $timeout(function(){
                    $scope.moving( $('.work-filter li.active, .approach-menu li.active') );
                },100);
            });
            $scope.$on('$viewContentLoaded', function(){
                $timeout(function(){
                    $('.work-filter li:first').trigger('click');
                },100);
            });
        }
    }
    
}])