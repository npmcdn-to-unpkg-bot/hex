designApp.factory('designAppFactory', function($http){
    var fac = {};
    fac.teamMembersFtry = function(){
        return $http({
            method: 'GET',
            url   : 'js/api/common/team.json' 
        })
    },
    fac.portfolioFtry = function(){
        return $http({
            method : 'GET',
            url    : 'js/api/common/portfolio.json'
        })
    },
    fac.testimonialFtry = function(){
        return $http({
            method: 'GET',
            url   : 'js/api/common/testimonial.json'
        })
    }
    return fac;
});


 