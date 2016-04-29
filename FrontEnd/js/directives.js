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
}])/*.directive('bannerDir', ['$rootScope', '$location', '$stateParams', function($rootScope, $location, $stateParams){
    return{
        restrict: 'A',
        link: function(scope, element, attrs){
            $rootScope.$on('$stateChangeSuccess', function(){
                $rootScope.pageName = $location.path().split('/')[1];
                $rootScope.casestudyName = $stateParams.id;
                    if($rootScope.pageName){
                        $rootScope.banner = 'views/banner/bnr-' + $rootScope.pageName + '.html';
                    }else{
                        $rootScope.banner = 'views/banner/bnr-home.html';
                    }
            });
        }
    }
}])*/.directive('screenDir', [function(){ 
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
}]).directive('movingDir',['$timeout', '$window', '$location', function($timeout, $window, $location){
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
            $('.work-filter li').hover(function(){
                $scope.moving( $(this) );
            });
            $('.work-filter ul').hover(function(){},
            function(){
                $scope.moving( $(this).find('li.active') );
            });
            $('.work-filter li').on('click', function(){
                $(this).parent().find('li').removeClass('active');
                $(this).addClass('active');
                $scope.moving( $(this) );
            });
            w.bind("resize", function(){
                if(  $('.work-filter li.active').length ) {
                    $timeout(function(){
                        $scope.moving( $('.work-filter li.active') );
                    },100);
                }
            });
            $scope.$on('$viewContentLoaded', function(){
                $timeout(function(){
                    $('.work-filter li:first').trigger('click');
                },100);
            });
        }
    }
    
}]).directive('imgFlip',['$interval', function($interval){
    return{
        restrict: 'A',
        link: function(scope, element, attrs){
            $('.flip-container').packery({
              itemSelector: '.img-flip',
              stamp: '.stamp'
             });
             $(".card").flip();
             prevNumber = 0;
             $interval(function(){
                 var eqNumber = Math.floor(Math.random() * 6);
                 if( eqNumber == prevNumber ){
                     var eqNumber = Math.floor(Math.random() * 6) ;
                 }
                 $('.flip-container .img-flip').eq(eqNumber).find('.card').trigger('click');
                 var prevNumber = eqNumber;
             },2000);
        }
    }
}]).directive('teamDir', ['$timeout', function($timeout){
    return{
        restrict: 'A',
        controller: function  ($scope, designAppFactory){ 
             var vm = this;
             vm.teamMemberPopupShow = false;
             designAppFactory.teamMembersFtry().success(function(response){
                vm.teamMembers = response;
             });
             vm.teamMemberPopup = function(member){
                 if(member || member == 0 ){
                    vm.member = vm.teamMembers[member];
                    vm.teamMemberPopupShow = true;
                 }else{
                    vm.teamMemberPopupShow = false;
                 }
             }
        },
        controllerAs: 'team'
         
    }
}]).directive('teamMemberFinishedDir', ['$timeout', function($timeout){
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                var shadowLimit = 200;
                var moveEvent = "mousemove";
                    $('.team .block').on(moveEvent, function(ev){

                        var $shadow = $(this).find('img');
                        var $this = $(this);
                        var w      = $this.width();
                        var h      = $this.height();
                        var center = { x: w/2, y: h/2 };
 
                        var evX = ev.clientX - $(this).offset().left;
                        var evY = ev.pageY - $(this).offset().top;

                        var shadowX = (center.x - evX) / 10;
                        var shadowY = (center.y - evY) / 10;

                        shadowX = (shadowX > shadowLimit) ? shadowLimit : shadowX;
                        shadowX = (shadowX < shadowLimit*-1) ? shadowLimit*-1 : shadowX;
                        shadowY = (shadowY > shadowLimit) ? shadowLimit : shadowY;
                        shadowY = (shadowY < shadowLimit*-1) ? shadowLimit*-1 : shadowY;
                        
                        var blur            =  Math.abs(shadowX*shadowY)/90;
                        var color           = 'px rgba(0,0,0,0.1))';
                        var CSSvalue        = 'drop-shadow(' + Math.ceil(shadowX) + 'px '+ Math.ceil(shadowY) +'px '+ blur + color;
 
                        $shadow.css({ 
                            '-webkit-filter': CSSvalue ,
                            '-moz-filter':    CSSvalue ,
                            '-ms-filter':     CSSvalue ,
                            'filter':         CSSvalue
                        });
                    }).on('mouseleave', function(){
                        var $shadow = $(this).find('img');
                        var CSSDefaultvalue = 'drop-shadow(-12px 5px 0px rgba(0, 0, 0, 0.1))';
                        $shadow.css({ 
                            '-webkit-filter': CSSDefaultvalue ,
                            '-moz-filter':    CSSDefaultvalue ,
                            '-ms-filter':     CSSDefaultvalue ,
                            'filter':         CSSDefaultvalue
                        }); 
                    });
                    //drop-shadow on image end
                });
            }
        }
    }
}])