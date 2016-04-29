var functionDownRunning = false;
var functionUpRunning = false;
$(window).bind('mousewheel DOMMouseScroll', function(event){
    // if check its home page or not
    if ( $('.home-main-panel').length ) {
        var isHoveredBanner = $('.banner-wrap').is(":hover");
        var isHoveredApproach = $('.approach').is(":hover");
        var isHoveredHomeMainPanel = $('.home-main-panel').is(":hover");
        //offset
        var approachOffset = $('.approach').offset().top;
        var homeMainPanelOffset = $('.home-main-panel').offset().top;
        var htmlBody = $('html, body');
        
         function scrollDown(){
            if (!functionDownRunning) {
                functionDownRunning = true;
                functionUpRunning = false;
                if(isHoveredBanner){
                        htmlBody.animate( {scrollTop: approachOffset }, 400);
                }
                if(isHoveredApproach){
                    htmlBody.animate( {scrollTop: homeMainPanelOffset }, 400);
                }
                setTimeout(function(){
                    functionDownRunning = false;
                },400);
            }
        }
        function scrollUp(){
            if (!functionUpRunning) {
                functionUpRunning = true;
                functionDownRunning = false;
                if(isHoveredApproach){
                    htmlBody.animate( {scrollTop: 0 }, 400);
                }
                if(isHoveredHomeMainPanel){
                    if( $('.home-main-panel').offset().top == $(window).scrollTop()  ){
                        htmlBody.animate( {scrollTop: approachOffset }, 400);
                    }
                    if( $('.home-main-panel').offset().top < $(window).scrollTop()  
                        &&
                        ($('.home-main-panel').offset().top + $(window).height() ) > $(window).scrollTop()  
                      ){
                        htmlBody.animate( {scrollTop: homeMainPanelOffset }, 400);
                    }
                }
                setTimeout(function(){
                    functionUpRunning = false;
                },400);
            }
        }
        if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
            scrollUp();
        }else {
            scrollDown();
        }
    }
});


 


