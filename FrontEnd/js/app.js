var designApp = angular.module('designApp', ['ngRoute', 'ocNgRepeat', 'designAppControllers']);
 
 designApp.config(['$routeProvider', function($routeProvider){
    $routeProvider.
    when('/',{
        templateUrl: 'views/home.html',
        controller : 'homeCtrl',
        controllerAs: 'home'
    }).otherwise(
        {redirectTo:'/'}
    )
 }]); 

