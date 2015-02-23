scotchApp.controller('panelController', function($scope, $http) {

	$scope.baseurl = "http://192.168.240.1/arduino/";
	$scope.buttons = [
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
	$scope.getButtonStateRest = function(button) {
		url=$scope.baseurl+"mode/"+button.idButton+"/output";
		console.log("SETMODE -> "+url);
		$http.get(url).success(function(data) {
            		$scope.response = data;
       		});
	}

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
		$scope.getButtonStateRest(button);
		$scope.setButtonStateRest(button);
	}
	$scope.buttonApply = function(button){
		    localStorage.setItem("{{button.IdButton}}", "{{button.description}}");
	}
});

scotchApp.controller('configController', function($scope) {
    $scope.message = 'Estamos en ello, esto es solo una demo';
});
