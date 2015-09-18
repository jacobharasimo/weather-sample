'use strict';

/**
 * @ngdoc service
 * @name weatherApp.weatherApi
 * @description
 * # weatherApi
 * Service in the weatherApp.
 */
angular.module('weatherApp')
  .factory('weatherApi', function ($resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return $resource('//api.openweathermap.org/data/2.5/:action',{},{
      search:{
        method:'GET',
        isArray:false,
        params:{
          action:'weather'
        },
        transformResponse:function Response(data){
          var result = angular.fromJson(data);
          return result;
        }
      },
      sevenDay:{
        method:'GET',
        isArray:false,
        params:{
          action:'forecast/daily'
        },
        transformResponse:function Response(data){
          var result = angular.fromJson(data);
          return result;
        }
      }
    });
  });
