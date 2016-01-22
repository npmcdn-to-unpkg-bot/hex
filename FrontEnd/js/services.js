designApp.factory('designAppFactory', function($http){
    var fac = {};
    fac.teamMembersFtry = function(){
        return $http({
            method: 'GET',
            url   : 'js/api/common/team.json' 
        })
    };
    return fac;
});


 