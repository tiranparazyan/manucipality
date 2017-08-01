'use strict';

/**
 * @ngdoc function
 * @name desktopApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the desktopApp
 */
angular.module('desktopApp')
  .controller('MainCtrl', ["$scope", "$timeout", "productsService", function ($scope, $timeout, productsService) {
    'use strict';

    $scope.product = {
      name: '',
      price: ''
    };

    $scope.createProduct = function() {
      productsService.products.addProduct({
        name:$scope.product.name,
        price:$scope.product.price,
      }, function(data) {

        $scope.product = {
          name: '',
          price: ''
        };

        $scope.message = data.message;

        $scope.hasBeenAdded = true;
        $timeout(function() {
          $scope.hasBeenAdded = false;
        }, 2000)
      })

    }


  }]);
