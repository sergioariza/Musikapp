app.controller("homeController", function appController($scope){
});

app.controller("newsController", function newsController($scope){
	$scope.news = 
		[
			{
				id: 0,
				name : "Glen",
				hobby : "Traveling",
				favoriteMusic : "Classical"
			},
			{
				id: 1,
				name : "Sergio",
				hobby : "Roller Skating",
				favoriteMusic : "Disco"
			},
		  	{
		  		id: 2,
				name : "Helen",
				hobby : "Rock Climbing",
				favoriteMusic : "Alternative"
			},
			{
				id: 3,
				name : "Glen",
				hobby : "Traveling",
				favoriteMusic : "Classical"
			},
			{
				id: 4,
				name : "Fred",
				hobby : "Roller Skating",
				favoriteMusic : "Disco"
			},
		  	{
		  		id: 5,
				name : "Helen",
				hobby : "Rock Climbing",
				favoriteMusic : "Alternative"
			},
			{
				id: 6,
				name : "Glen",
				hobby : "Traveling",
				favoriteMusic : "Classical"
			},
			{
				id: 7,
				name : "Sergio",
				hobby : "Roller Skating",
				favoriteMusic : "Disco"
			},
		  	{
		  		id: 8,
				name : "Helen",
				hobby : "Rock Climbing",
				favoriteMusic : "Alternative"
			},
			{
				id: 9,
				name : "Glen",
				hobby : "Traveling",
				favoriteMusic : "Classical"
			},
			{
				id: 10,
				name : "Fred",
				hobby : "Roller Skating",
				favoriteMusic : "Disco"
			},
		  	{
		  		id: 11,
				name : "Helen",
				hobby : "Rock Climbing",
				favoriteMusic : "Alternative"
			},
			{
				id: 12,
				name : "Glen",
				hobby : "Traveling",
				favoriteMusic : "Classical"
			},
			{
				id: 13,
				name : "Sergio",
				hobby : "Roller Skating",
				favoriteMusic : "Disco"
			},
		  	{
		  		id: 14,
				name : "Helen",
				hobby : "Rock Climbing",
				favoriteMusic : "Alternative"
			},
			{
				id: 15,
				name : "Glen",
				hobby : "Traveling",
				favoriteMusic : "Classical"
			},
			{
				id: 16,
				name : "Fred",
				hobby : "Roller Skating",
				favoriteMusic : "Disco"
			},
		  	{
		  		id: 17,
				name : "Helen",
				hobby : "Rock Climbing",
				favoriteMusic : "Alternative"
			},
			{
				id: 18,
				name : "Glen",
				hobby : "Traveling",
				favoriteMusic : "Classical"
			},
			{
				id: 19,
				name : "Sergio",
				hobby : "Roller Skating",
				favoriteMusic : "Disco"
			},
		  	{
		  		id: 20,
				name : "Helen",
				hobby : "Rock Climbing",
				favoriteMusic : "Alternative"
			},
			{
				id: 21,
				name : "Glen",
				hobby : "Traveling",
				favoriteMusic : "Classical"
			},
			{
				id: 22,
				name : "Fred",
				hobby : "Roller Skating",
				favoriteMusic : "Disco"
			},
		  	{
		  		id: 23,
				name : "Helen",
				hobby : "Rock Climbing",
				favoriteMusic : "Alternative"
			},
			{
				id: 24,
				name : "Glen",
				hobby : "Traveling",
				favoriteMusic : "Classical"
			}
		];

		$scope.id = -1;
		$scope.name = '';
		$scope.hobby = '';
		$scope.favoriteMusic = '';

		$scope.edit = true;
		$scope.error = false;
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

				if (!found) {
					addUser();
				}		    
			}else{
				addUser();
			}
		};

		function addUser(){
				var newUser = {id: $scope.id, name: $scope.name, hobby: $scope.hobby, favoriteMusic: $scope.favoriteMusic};
				$scope.news.push(newUser);
				$scope.id = $scope.news.length;
				$scope.name = '';
		    	$scope.hobby = '';
		    	$scope.favoriteMusic = '';
		}

		$scope.removeItem = function removeItem(row) {
	        var index = $scope.news.indexOf(row);
	        if (index !== -1) {
	            $scope.news.splice(index, 1);
	        }
    	}

		$scope.$watch('name', function() {$scope.test();});
		$scope.$watch('hobby', function() {$scope.test();});
		$scope.$watch('favoriteMusic', function() {$scope.test();});

		$scope.test = function() {
		  $scope.incomplete = false;

		  if (!$scope.name.length || !$scope.hobby.length || !$scope.favoriteMusic.length){
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