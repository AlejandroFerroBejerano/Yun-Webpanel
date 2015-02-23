(function() {
// script.js
// create the module and name it panelApp
// also include ngRoute for all our routing needs
	var panelApp = angular.module('panelApp', ['ngRoute']);

	// configure our routes
	panelApp.config(function($routeProvider) {
		$routeProvider

		    // route for the home page
		    .when('/', {
		        templateUrl : 'pages/home.html',
		        controller  : 'mainController'
		    })

		    // route for the about page
		    .when('/panel', {
		        templateUrl : 'pages/panel.html',
		        controller  : 'panelController'
		    })

		    // route for the contact page
		    .when('/configuration', {
		        templateUrl : 'pages/configuration2.html',
		        controller  : 'configController'
		    });
	});


	// create the controller and inject Angular's $scope
	panelApp.controller('mainController', function($scope) {
		// create a message to display in our view
	});

	panelApp.controller('panelController', function($scope, $http) {
		
		this.buttons = buttons;
		this.description='';

		$scope.baseurl = "http://192.168.240.1/arduino/";
		
		$scope.getButtonModeRest = function(button) {
			url=$scope.baseurl+"mode/"+button.idButton+"/output";
			console.log("SETMODE -> "+url);
			$http.get(url).success(function(data) {
		        		$scope.response = data;
		   		});
		}
	
		$scope.getButtonState = function(button) {
			url=$scope.baseurl+button.type+"/"+button.idButton+"/";
			console.log("GETSTATE -> "+url);
			$http.get(url).success(function(data) {
		        		$scope.response = data;
		   		});
		}

		$scope.addDescription = function(button){
			button.description = this.description;
			console.log("this -> "+ button.description);
			
		};
		$scope.setButtonStateRest = function(button) {
			url=$scope.baseurl+button.type+"/"+button.idButton+"/";
			if(button.state)
				url=url+"1";
			else
				url=url+"0";
			console.log("GET -> "+url);
			$http.get(url).success(function(data) {
		        		$scope.response = data;
		   		});
		}

		$scope.buttonClick = function(button){

			console.log("button has clicked");
			button.state=!button.state;
			$scope.getButtonModeRest(button);
			$scope.setButtonStateRest(button);
		}
	});

	panelApp.controller('configController', function() {
		this.description='';
		this.addButton = function(button){
			button.description = this.description;
			console.log("this -> "+ button.description);
			
		};
		
	});

	panelApp.controller('TabController', function(){
    	this.tab = 1;

    	this.setTab = function(tab){
      		this.tab = tab;
    	};

    	this.isSet = function(tab){
      	return (this.tab === tab);
    	};
	});

	
	var buttons = [
			{idButton:'13', state:false ,mode:'output' ,type:'digital' ,description:'Comedor'},
			{idButton:'12', state:false ,mode:'output' ,type:'digital' ,description:'Salon'},
			{idButton:'11', state:false ,mode:'output' ,type:'digital' ,description:'Dormitorio principal'},
			{idButton:'10', state:false ,mode:'output' ,type:'digital' ,description:'Dormitorio 2'},
			{idButton:'9', state:false ,mode:'output' ,type:'digital' ,description:'Dormitorio 3'},
			{idButton:'8', state:false ,mode:'output' ,type:'digital' ,description:'Entrada'},
			{idButton:'7', state:false ,mode:'output' ,type:'digital' ,description:'Aseo 1'},
			{idButton:'6', state:false ,mode:'output' ,type:'digital' ,description:'Cocina'},
			{idButton:'5', state:false ,mode:'output' ,type:'digital' ,description:'Aseo 2'}
		];
})();
