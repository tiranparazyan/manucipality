angular.module('desktopApp')
  .directive('productGrid', function () {

    return {
      restrict: 'A',
      templateUrl: '../views/grid.html',
      link: function(scope, elem, attrs) {
        console.log(scope,elem, attrs)
      }
    };

  });
