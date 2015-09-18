'use strict';

/**
 * @ngdoc service
 * @name weatherApp.responseInterceptor
 * @description
 * # responseInterceptor
 * Factory in the weatherApp.
 */
angular.module('weatherApp')
  .factory('responseInterceptor', function ($q, $log) {
    return {
      response: function resolve(response) {
        if (response.config) {
          if (response.status >= 200 && response.status < 500) {
            $log.debug("Good response received by interceptor:",response);
          }
        }
        return response || $q.when(response);
      },
      responseError: function resolve(response) {
        if (response.data && response.data.messages) {
          $log.warn("failed response received by interceptor:",response);
          return $q.reject(response);
        }
      }
    };
  });
