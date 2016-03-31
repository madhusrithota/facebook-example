angular.module('fbApp', ['ngFacebook','ui.router','ui.bootstrap','ngCookies'])

.config(['$stateProvider','$urlRouterProvider','$facebookProvider',
  function($stateProvider, $urlRouterProvider, $facebookProvider) {
	 $facebookProvider.setAppId('509185875933519');
     $urlRouterProvider.otherwise('/facebook');
     $stateProvider.
      state('facebook', {
	  url:'/facebook',
	  templateUrl: 'facebook.html',
	  controller: 'DemoCtrl'
      }).
	  state('userhome', {
	  url:'/userhome',
	  templateUrl: 'userhome.html',
	  controller: 'UserProfileCtrl'
      }).
	  state('skills', {
	  url:'/skills',
	  templateUrl: 'skills.html',
	  controller: 'SkillsController'
      })
}])
.run( function( $rootScope ) {
  // Load the facebook SDK asynchronously
  (function(){
     // If we've already installed the SDK, we're done
     if (document.getElementById('facebook-jssdk')) {return;}

     // Get the first script element, which we'll use to find the parent node
     var firstScriptElement = document.getElementsByTagName('script')[0];

     // Create a new script element and set its id
     var facebookJS = document.createElement('script'); 
     facebookJS.id = 'facebook-jssdk';

     // Set the new script's source to the source of the Facebook JS SDK
     facebookJS.src = 'http://connect.facebook.net/en_US/all.js';

     // Insert the Facebook JS SDK into the DOM
     firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
   }());
})


		
.controller('DemoCtrl', 
 function ($scope, $facebook, $state,$cookies){
	$scope.isLoggedIn = false;
	
    $scope.login = function() {
		$facebook.login().then(function(response) {
			$state.go('userhome');
		});
    }
})


.controller('UserProfileCtrl', function($facebook,$scope,$cookies,$state){
	$facebook.api("/me",{fields: 'name,gender, first_name, last_name, email'}).then( 
			  function(response) {	
				//$cookies.madhu="madhuuuuu";
				$scope.user = {};
				$scope.user.isDisplay="true";
				$scope.user.email = response.email;
				$scope.user.name = response.name;
				$scope.user.gender = response.gender;
				$scope.user.welcomeMsg = "Welcome " + response.name;
				$scope.user.FbId = response.id; 
				$scope.user.FbProfilePIc = "https://graph.facebook.com/"+response.id+"/picture";
				$scope.user.appId = response.name;
				//$rootScope.user = $scope.user;
				$scope.isLoggedIn = true;
				console.log($scope.user);
				//$state.go('userhome');
			  },
			  function(err) {
				$state.go('facebook');
			  });
	
})

.controller('SkillsController',['$scope','$cookies', function($scope,$cookies) {
	console.log("skills Ctrl");
	
	$scope.skillsArray = ["Java", "Angular Js", "Hibernate", "MySQL" , ".Net" ];
	$scope.proficiencyArray = ["Beginner", " Intermediate", "Expert"];
	$scope.yearsArray = [0,1,2,3,4,5,6,7,8,9,10];
	$scope.monthsArray = [0,1,2,3,4,5,6,7,8,9,10,11];
	//$scope.message="Hieeee";
	$scope.rows = [];
	
	 $scope.addSkill = function (form) {
		 //console.log(form);
		 //$scope.formData = form;
		 //console.log($scope.formData);
		 //$scope.isDisabled_index = false;
		 //$scope.isDisplay_index = true;
			
		 // $cookies.form = form;
		 //console.log($cookies.form);
		 //$cookies.proficiency = $scope.proficiency;
		// $cookies.years = $scope.years;
		 //$cookies.months = $scope.months;
		 //$cookies.comments = $scope.comments;
		 //$scope.addrow($scope.formData);
		 // $scope.rows.push(form);
		 //console.log($scope.rows);
		 // $scope.skillForm = {};
		 //console.log($cookies.skills);
		 //$scope.show = true; 
		 
		 if ($scope.myForm.$valid) {
			 //form data is storing into the cookie
             $cookies.form = form;	
             //adding an extra row			 
			 $scope.rows.push(form); 
			 //making form data empty to the added row
			 $scope.skillForm = {}; 
		} 
	 }
	 
	 $scope.editSkill = function(editedForm){
		 //storing edited form data into cookies
		 $cookies.form = editedForm;
		 console.log($cookies.form);
		 alert("Skills are updated successfully");
	 }
	 
	 $scope.deleteSkill = function(formData){
		 //removing form data from cookies
		 $cookies.remove(formData);
		 console.log(formData);
	 }
	 
	 $scope.removeRow = function (index) {
		 //deleting single row from the table
		 $scope.rows.splice(index, 1);
	 }
	 
   
}]);

