'use strict';

/**
 * @ngdoc function
 * @name desktopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the desktopApp
 */
angular.module('desktopApp')
  .controller('ProductListCtrl', [ "$scope", "productsService", function ($scope, productsService) {
     var tmpRightSide, tmpLeftSide;
    (function () {


      productsService.products.getAll(function(data) {
        data.map(function(value) {
          value.editName = false;
          value.editPrice = false;
        })
        $scope.products = data;
        console.log(data)
      }, function(error) {
        console.log(error)
      })
    })();

    $scope.deleteProduct = function(id) {
      productsService.products.deleteOne({
        _id: id
      }, function(data) {
        data.map(function(value) {
          value.editName = false;
          value.editPrice = false;
        })
        $scope.products = data;
      }, function(err) {
        console.log(err);
      })
    }

    $scope.toggleEdit = function(toggleName, togglePrice, obj) {
      if(toggleName !== null) obj.editName = toggleName;
      if(togglePrice !== null) obj.editPrice = togglePrice;

      if(toggleName === false || togglePrice === false) {
        delete obj.editName;
        delete obj.editPrice;
        productsService.products.updateOne({
          updated:obj
        }, function(data) {

        }, function(error) {

        })
      }

    }


    $scope.moveRow = function(direction, index) {
      if(direction) {
        if(index == 0) return false;
        index--;
        tmpLeftSide = $scope.products.slice(0, index);
        tmpLeftSide.push($scope.products[index+1]);
        $scope.products.splice(index+1, 1)
        tmpRightSide = $scope.products.slice(index, $scope.products.length);
        $scope.products = tmpLeftSide.concat(tmpRightSide);


      }
      if(!direction) {
        if(index == $scope.products.length-1) return false;
        index++;
        tmpRightSide = $scope.products.slice(index+1, $scope.products.length);
        tmpRightSide.unshift($scope.products[index-1]);
        $scope.products.splice(index-1, 1)
        tmpLeftSide = $scope.products.slice(0, index);
        $scope.products = tmpLeftSide.concat(tmpRightSide);


      }
    }

  }]);
