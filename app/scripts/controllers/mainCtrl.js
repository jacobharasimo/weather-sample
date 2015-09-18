'use strict';

/**
 * @ngdoc function
 * @name weatherApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the weatherApp
 */
angular.module('weatherApp')
  .controller('MainCtrl', MainCtrl);


function MainCtrl(weatherApi, $log, $location) {
  var vm = {};

  function init() {
    vm.term = $location.search().q || null;
    vm.getResults = getResults;
    vm.detailedForecast = detailedForecast;
    vm.currentForcast = null;
    if (vm.term) {
      getResults(vm.term);
    }
  }

  function detailedForecast(term) {
    var payload = {q: term,cnt:7,units:'metric'};
    vm.weatherDetails = weatherApi.sevenDay(payload,
      function success(response) {
        $log.debug("forecast details: ", response);
      }, function error(reason) {
        $log.debug("forecast detail errors: ", reason);
      });
  }

  function getResults(term) {
    var payload = {q: term,units:'metric'};
    weatherApi.search(payload,
      function success(response) {
        $log.info("response received: ", response);
        return response;
      },
      function error(reason) {
        $log.warn("there was a problem: ", reason);
      }).$promise.then(function always(response) {
        /*we are using the promise because we also want to trigger teh serach update on success or fail. because
         * we are using this we have to also bind teh vm.currentForecast here. if we had not wanted to do this we could
         * of just set the vm.currentForcast =  weatherApi.search(...) and it would of also worked*/
        vm.currentForcast = response;
        $location.search(payload);
        return response;
      });
  }

  init();
  return vm;
}
