define(function (require) {
  'use strict';

  var angular = require('angular');
//Controller for executing currency conversion
var app = angular.module('CurrencyConverterApp', []);

app.init = function () {
      angular.bootstrap(document, ['CurrencyConverterApp']);
  };

   app.controller('ControllerForConverting', ['$scope', '$http', function($scope, $http) {
        $scope.rates = {};
		//using Json data with specific needed currencies
        $http.get('http://api.fixer.io/latest?base=ZAR&symbols=EUR,USD,CAD')
            .then(function(res) {  // 'res' will be having the result value
                $scope.rates = res.data.rates; 
				$scope.toType = $scope.rates.USD;
                $scope.fromType = $scope.rates.CAD;            
                $scope.currencyConverterFunction(); // converting function called in the controller
				
            }, function(err){		 // for error handling purpose		
				console.log(err);
				alert("An error occured")
			});
			$scope.fromType = $scope.rates[1];
			//function for converting values
        $scope.currencyConverterFunction = function() {
            $scope.toValue = $scope.fromValue * ($scope.toType * (1 / $scope.fromType));
           
        };
		
		
		
    }]);
	
 app.directive('validNumber', function() {
      return {
        require: '?ngModel',
        link: function(scope, element, attrs, ngModelCtrl) {
          if(!ngModelCtrl) {
            return; 
          }
          ngModelCtrl.$parsers.push(function(val) {
            if (angular.isUndefined(val)) {
                var val = '';
            }            
            var clean = val.replace(/[^0-9\.]/g, '');          
			var decimalCheck = clean.split('.');                   
            if(!angular.isUndefined(decimalCheck[1])) {
                decimalCheck[1] = decimalCheck[1].slice(0,2);
                clean =decimalCheck[0] + '.' + decimalCheck[1];
            }
            if (val !== clean) {
              ngModelCtrl.$setViewValue(clean);
              ngModelCtrl.$render();
            }
            return clean;
          });
          element.bind('keypress', function(event) {
            if(event.keyCode === 32) {
              event.preventDefault();
            }
          });
        }
      };
    });
app.controller('disclaimerDetails', function($scope) {
	$scope.isActive = true;
    $scope.myVar = false;
    $scope.toggle = function() {
        $scope.myVar = !$scope.myVar;
		$scope.isActive = !$scope.isActive;
    };
});
return app;
});
   
