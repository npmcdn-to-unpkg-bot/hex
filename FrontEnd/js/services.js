designApp.factory('designAppFactory', function($http){
    var fac = {};
    fac.teamMembersFtry = function(){
        return $http({
            method: 'GET',
            url   : 'js/api/common/team.json' 
        })
    },
    fac.workFtry = function(){
        return $http({
            method : 'GET',
            url    : 'js/api/common/work.json'
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


 