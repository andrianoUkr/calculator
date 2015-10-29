var WebApp = angular.module('webApp', []);

WebApp.controller('CalculatorCtrl', function($scope) {
	$scope.number = 0;
	$scope.operation ='';
	$scope.memory ='';
	var memory = 0;
	var pendingValue = 0;	
	var resultValue = 0;	
	var pendingOperation = '';
	var statusNew = false;
	
	$scope.setNumber = function(num){
		if (statusNew) {
			$scope.number = num || 0;
			statusNew = false;
		} else {
			if ($scope.number == "0"){
				$scope.number = num;
			} else {
				if($scope.number.toString().length < 15){
					$scope.number += String(num);
				}
			}
		}		
	}
	
	$scope.rememberAction = function (value){
		var memoryValue = value || '';
		switch (memoryValue) {
			case 'M+':
				statusNew = true;
				memory += parseFloat($scope.number);
				$scope.memory = 'M';
				break;
			case 'M-':
				statusNew = true;
				memory -= parseFloat($scope.number);
				$scope.memory = 'M';
				break;
			case 'MC':
				memory = 0;		
				$scope.memory ='';
				break;
			case 'MR':
				$scope.number = parseFloat(memory);
				break;		
			default:
				$scope.memory = '';	
			  break;
		}	
	}
	
	$scope.clearAction = function (){
		$scope.number = 0;
		$scope.operation ='';		
		pendingValue = 0;
		resultValue = 0;
		pendingOperation = '';
		statusNew = false;
	}		
	
	$scope.setOperation = function(oper){
		var operation = oper  || '=';
		pendingValue = $scope.number;
		if (statusNew && pendingOperation != "="){
			$scope.number = resultValue;		
		} else {
			statusNew = true;
			switch (pendingOperation) {
				case '+':
					resultValue += parseFloat(pendingValue);
					break;
				case '-':
					resultValue -= parseFloat(pendingValue);
					break;
				case '*':
					resultValue *= parseFloat(pendingValue);
					break;
				case '/':
					resultValue /= parseFloat(pendingValue);
					break;		
				default:
					resultValue = parseFloat(pendingValue);	
				  break;
			}			
			if(operation == '='){
				$scope.operation = '';
			} else {
				$scope.operation = operation;
			}
			
			$scope.number = resultValue;
			pendingOperation = operation;
		}
	}
	
	$scope.decimalAction = function (){
		var curValue = $scope.number;
		if (statusNew) {
			curValue = "0.";
			statusNew = false;
		} else {
			if (curValue.toString().indexOf(".") == -1){
				curValue += ".";
			}
		}
		$scope.number = curValue;
	}
	
	$scope.percentAction = function (){
		$scope.number = (parseFloat($scope.number)/100)*parseFloat(resultValue);
	}	
	
	$scope.backAction = function (){
		if (!statusNew){
			var curValue = $scope.number.toString();
			$scope.number = curValue.substring(0,(curValue.length-1)) || 0;
		}
	}
})