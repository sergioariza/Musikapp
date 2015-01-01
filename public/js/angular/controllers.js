app.controller("homeController", function appController($scope, $http, $location, $window){
	$scope.logout = function()
	{
		$http.post("/logout")
		.success(function(data) {
		    $window.location = "/";
		})
		.error(function(status, data) {
		    console.log(status);
		    console.log(data);
		});
	}
});

app.controller("newsController", function newsController($scope, $http){
	$http.get("/news").success(function(data)
	{
		$scope.news = data;
	});

	$scope.id = -1;
	$scope.name = '';
	$scope.hobby = '';
	$scope.favoriteMusic = '';
	$scope.edit = true;
	$scope.operationInProgress = false;
	$scope.incomplete = false;

	$scope.editUser = function(id) {
		if (id == 'new') {
			$scope.edit = false;
			$scope.incomplete = true;
			$scope.id = $scope.news.length;
			$scope.name = '';
			$scope.hobby = '';
			$scope.favoriteMusic = '';
		} else {
			$scope.edit = true;
			$scope.id = $scope.news[id].id;
			$scope.name = $scope.news[id].name;
			$scope.hobby = $scope.news[id].hobby;
			$scope.favoriteMusic = $scope.news[id].favoriteMusic;
		}

		$scope.operationInProgress = true;
	};

	$scope.saveUser = function() {
		if($scope.edit){
			var found = false;
			for (var i = 0; i < $scope.news.length; i++) {
				if ($scope.news[i].id == $scope.id) {
				    $scope.news[i].name = $scope.name;
			    	$scope.news[i].hobby = $scope.hobby;
			    	$scope.news[i].favoriteMusic = $scope.favoriteMusic;
				    found = true;
				    break;
				}
			}

			if (found) {
				addOrModifyUser();
			}		    
		}else{
			addOrModifyUser();
		}
	};

	function addOrModifyUser(){
		var newUser = {id: $scope.id, name: $scope.name, hobby: $scope.hobby, favoriteMusic: $scope.favoriteMusic};
			
		$scope.id = -1;
		$scope.name = '';
		$scope.hobby = '';
		$scope.favoriteMusic = '';
		$scope.operationInProgress = false;

		if($scope.edit){
			$http.put("/news/" + newUser.id, newUser);
		}else{
			$scope.news.push(newUser);
			$http.post("/news", newUser);
		}
	}

	$scope.removeItem = function removeItem(row, id) {
	    var index = $scope.news.indexOf(row);
	        
	    if (index !== -1) {
	        $scope.news.splice(index, 1);
	        $http.delete("/news/" + id);
	    }
    }

	$scope.$watch('name', function() {$scope.test();});
	$scope.$watch('hobby', function() {$scope.test();});
	$scope.$watch('favoriteMusic', function() {$scope.test();});

	$scope.test = function() {
		$scope.incomplete = false;

		if (!$scope.name.length || !$scope.hobby.length || !$scope.favoriteMusic.length || !$scope.operationInProgress){
			$scope.incomplete = true;
		}
	};
})

app.controller("showsController", function showsController($scope){
	$scope.shows = 
		[
			{
				name : "Sergio",
				hobby : "Roller Skating",
				favoriteMusic : "Disco"
			},
		  	{
				name : "Helen",
				hobby : "Rock Climbing",
				favoriteMusic : "Alternative"
			},
			{
				name : "Glen",
				hobby : "Traveling",
				favoriteMusic : "Classical"
			},
			{
				name : "Fred",
				hobby : "Roller Skating",
				favoriteMusic : "Disco"
			},
		  	{
				name : "Helen",
				hobby : "Rock Climbing",
				favoriteMusic : "Alternative"
			},
			{
				name : "Glen",
				hobby : "Traveling",
				favoriteMusic : "Classical"
			},
			{
				name : "Sergio",
				hobby : "Roller Skating",
				favoriteMusic : "Disco"
			},
		  	{
				name : "Helen",
				hobby : "Rock Climbing",
				favoriteMusic : "Alternative"
			},
			{
				name : "Glen",
				hobby : "Traveling",
				favoriteMusic : "Classical"
			},
			{
				name : "Fred",
				hobby : "Roller Skating",
				favoriteMusic : "Disco"
			},
		  	{
				name : "Helen",
				hobby : "Rock Climbing",
				favoriteMusic : "Alternative"
			},
			{
				name : "Glen",
				hobby : "Traveling",
				favoriteMusic : "Classical"
			},
			{
				name : "Sergio",
				hobby : "Roller Skating",
				favoriteMusic : "Disco"
			},
		  	{
				name : "Helen",
				hobby : "Rock Climbing",
				favoriteMusic : "Alternative"
			},
			{
				name : "Glen",
				hobby : "Traveling",
				favoriteMusic : "Classical"
			},
			{
				name : "Fred",
				hobby : "Roller Skating",
				favoriteMusic : "Disco"
			},
		  	{
				name : "Helen",
				hobby : "Rock Climbing",
				favoriteMusic : "Alternative"
			},
			{
				name : "Glen",
				hobby : "Traveling",
				favoriteMusic : "Classical"
			},
			{
				name : "Sergio",
				hobby : "Roller Skating",
				favoriteMusic : "Disco"
			},
		  	{
				name : "Helen",
				hobby : "Rock Climbing",
				favoriteMusic : "Alternative"
			},
			{
				name : "Glen",
				hobby : "Traveling",
				favoriteMusic : "Classical"
			},
			{
				name : "Fred",
				hobby : "Roller Skating",
				favoriteMusic : "Disco"
			},
		  	{
				name : "Helen",
				hobby : "Rock Climbing",
				favoriteMusic : "Alternative"
			},
			{
				name : "Glen",
				hobby : "Traveling",
				favoriteMusic : "Classical"
			}
		];
})

app.controller("videosController", function videosController($scope){
	$scope.videos = 
		[
			{
				name : "Sergio",
				hobby : "Roller Skating",
				favoriteMusic : "Disco"
			},
		  	{
				name : "Helen",
				hobby : "Rock Climbing",
				favoriteMusic : "Alternative"
			},
			{
				name : "Glen",
				hobby : "Traveling",
				favoriteMusic : "Classical"
			},
			{
				name : "Fred",
				hobby : "Roller Skating",
				favoriteMusic : "Disco"
			},
		  	{
				name : "Helen",
				hobby : "Rock Climbing",
				favoriteMusic : "Alternative"
			},
			{
				name : "Glen",
				hobby : "Traveling",
				favoriteMusic : "Classical"
			},
			{
				name : "Sergio",
				hobby : "Roller Skating",
				favoriteMusic : "Disco"
			},
		  	{
				name : "Helen",
				hobby : "Rock Climbing",
				favoriteMusic : "Alternative"
			},
			{
				name : "Glen",
				hobby : "Traveling",
				favoriteMusic : "Classical"
			},
			{
				name : "Fred",
				hobby : "Roller Skating",
				favoriteMusic : "Disco"
			},
		  	{
				name : "Helen",
				hobby : "Rock Climbing",
				favoriteMusic : "Alternative"
			},
			{
				name : "Glen",
				hobby : "Traveling",
				favoriteMusic : "Classical"
			},
			{
				name : "Sergio",
				hobby : "Roller Skating",
				favoriteMusic : "Disco"
			},
		  	{
				name : "Helen",
				hobby : "Rock Climbing",
				favoriteMusic : "Alternative"
			},
			{
				name : "Glen",
				hobby : "Traveling",
				favoriteMusic : "Classical"
			},
			{
				name : "Fred",
				hobby : "Roller Skating",
				favoriteMusic : "Disco"
			},
		  	{
				name : "Helen",
				hobby : "Rock Climbing",
				favoriteMusic : "Alternative"
			},
			{
				name : "Glen",
				hobby : "Traveling",
				favoriteMusic : "Classical"
			},
			{
				name : "Sergio",
				hobby : "Roller Skating",
				favoriteMusic : "Disco"
			},
		  	{
				name : "Helen",
				hobby : "Rock Climbing",
				favoriteMusic : "Alternative"
			},
			{
				name : "Glen",
				hobby : "Traveling",
				favoriteMusic : "Classical"
			},
			{
				name : "Fred",
				hobby : "Roller Skating",
				favoriteMusic : "Disco"
			},
		  	{
				name : "Helen",
				hobby : "Rock Climbing",
				favoriteMusic : "Alternative"
			},
			{
				name : "Glen",
				hobby : "Traveling",
				favoriteMusic : "Classical"
			}
		];
})