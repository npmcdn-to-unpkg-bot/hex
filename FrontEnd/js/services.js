designApp.factory('designAppFactory', function($http){
    var fac = {};
    fac.teamMembersFtry = function(){
        return $http({
            method: 'GET',
            url   : 'js/api/team.json' 
        })
    },
    fac.workFtry = function(){
        return $http({
            method : 'GET',
            url    : 'js/api/work.json'
        })
    },
    fac.testimonialFtry = function(){
        return $http({
            method: 'GET',
            url   : 'js/api/testimonial.json'
        })
    }
    fac.clientsFtry = function(){
        return $http({
            method: 'GET',
            url   : 'js/api/clients.json'
        })
    }
    return fac;
});


 