angular.module('desktopApp')
  .factory('productsService', ['$resource', function ($resource) {
    'use strict';
    var BASE_URL = 'http://localhost:3000/';
    var service = {};
    service.products = $resource(BASE_URL, {}, {
      getAll: {
        method: 'GET',
        cache:false,
        isArray:true
      },
      addProduct: {
        method: 'POST',
        url: BASE_URL + "addproduct",

      },
      deleteOne: {
        method: 'POST',
        url: BASE_URL + "deleteproduct",
        isArray:true

      },
      updateOne: {
        method: 'POST',
        url: BASE_URL + "updateproduct",
        isArray:true
      }

    });
    return service;
  }]);
