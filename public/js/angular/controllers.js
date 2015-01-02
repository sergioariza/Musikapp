app.controller("homeController", function appController($scope, $http, $location, $window, UserServices){
	$scope.logout = function()
	{
		UserServices.logout().success(function(data){
		    $window.location = "/";
		})
		.error(function(status, data) {
		    console.log(status);
		    console.log(data);
		});
	}
});

app.controller("newsController", function newsController($scope, $http, NewsServices){
	NewsServices.getAllNews().success(function(data){
		$scope.news = data;
	});

	$scope.id = -1;
	$scope.name = '';
	$scope.hobby = '';
	$scope.favoriteMusic = '';
	$scope.edit = true;
	$scope.operationInProgress = false;
	$scope.incomplete = false;

	$scope.editItem = function(id) {
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

	$scope.saveItem = function() {
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
				addOrModifyItem();
			}		    
		}else{
			addOrModifyItem();
		}
	};

	function addOrModifyItem(){
		var newItem = {id: $scope.id, name: $scope.name, hobby: $scope.hobby, favoriteMusic: $scope.favoriteMusic};
			
		$scope.id = -1;
		$scope.name = '';
		$scope.hobby = '';
		$scope.favoriteMusic = '';
		$scope.operationInProgress = false;

		if($scope.edit){
			NewsServices.updateNews(newItem);
		}else{
			$scope.news.push(newItem);
			NewsServices.createNews(newItem);
		}
	}

	$scope.removeItem = function removeItem(row, id) {
	    var index = $scope.news.indexOf(row);
	        
	    if (index !== -1) {
	        $scope.news.splice(index, 1);
	        NewsServices.removeNews(id);
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

app.controller("showsController", function showsController($scope, $http, ShowsServices){
	ShowsServices.getAllShows().success(function(data)
	{
		$scope.shows = data;
	});

	$scope.id = -1;
	$scope.name = '';
	$scope.hobby = '';
	$scope.favoriteMusic = '';
	$scope.edit = true;
	$scope.operationInProgress = false;
	$scope.incomplete = false;

	$scope.editItem = function(id) {
		if (id == 'new') {
			$scope.edit = false;
			$scope.incomplete = true;
			$scope.id = $scope.shows.length;
			$scope.name = '';
			$scope.hobby = '';
			$scope.favoriteMusic = '';
		} else {
			$scope.edit = true;
			$scope.id = $scope.shows[id].id;
			$scope.name = $scope.shows[id].name;
			$scope.hobby = $scope.shows[id].hobby;
			$scope.favoriteMusic = $scope.shows[id].favoriteMusic;
		}

		$scope.operationInProgress = true;
	};

	$scope.saveItem = function() {
		if($scope.edit){
			var found = false;
			for (var i = 0; i < $scope.shows.length; i++) {
				if ($scope.shows[i].id == $scope.id) {
				    $scope.shows[i].name = $scope.name;
			    	$scope.shows[i].hobby = $scope.hobby;
			    	$scope.shows[i].favoriteMusic = $scope.favoriteMusic;
				    found = true;
				    break;
				}
			}

			if (found) {
				addOrModifyItem();
			}		    
		}else{
			addOrModifyItem();
		}
	};

	function addOrModifyItem(){
		var newItem = {id: $scope.id, name: $scope.name, hobby: $scope.hobby, favoriteMusic: $scope.favoriteMusic};
			
		$scope.id = -1;
		$scope.name = '';
		$scope.hobby = '';
		$scope.favoriteMusic = '';
		$scope.operationInProgress = false;

		if($scope.edit){
			ShowsServices.updateShows(newItem);
		}else{
			$scope.shows.push(newItem);
			ShowsServices.createShows(newItem);
		}
	}

	$scope.removeItem = function removeItem(row, id) {
	    var index = $scope.shows.indexOf(row);
	        
	    if (index !== -1) {
	        $scope.shows.splice(index, 1);
	        ShowsServices.removeShows(id);
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

app.controller("videosController", function videosController($scope, $http, VideosServices){
	VideosServices.getAllVideos().success(function(data)
	{
		$scope.videos = data;
	});

	$scope.id = -1;
	$scope.name = '';
	$scope.hobby = '';
	$scope.favoriteMusic = '';
	$scope.edit = true;
	$scope.operationInProgress = false;
	$scope.incomplete = false;

	$scope.editItem = function(id) {
		if (id == 'new') {
			$scope.edit = false;
			$scope.incomplete = true;
			$scope.id = $scope.videos.length;
			$scope.name = '';
			$scope.hobby = '';
			$scope.favoriteMusic = '';
		} else {
			$scope.edit = true;
			$scope.id = $scope.videos[id].id;
			$scope.name = $scope.videos[id].name;
			$scope.hobby = $scope.videos[id].hobby;
			$scope.favoriteMusic = $scope.videos[id].favoriteMusic;
		}

		$scope.operationInProgress = true;
	};

	$scope.saveItem = function() {
		if($scope.edit){
			var found = false;
			for (var i = 0; i < $scope.videos.length; i++) {
				if ($scope.videos[i].id == $scope.id) {
				    $scope.videos[i].name = $scope.name;
			    	$scope.videos[i].hobby = $scope.hobby;
			    	$scope.videos[i].favoriteMusic = $scope.favoriteMusic;
				    found = true;
				    break;
				}
			}

			if (found) {
				addOrModifyItem();
			}		    
		}else{
			addOrModifyItem();
		}
	};

	function addOrModifyItem(){
		var newItem = {id: $scope.id, name: $scope.name, hobby: $scope.hobby, favoriteMusic: $scope.favoriteMusic};
			
		$scope.id = -1;
		$scope.name = '';
		$scope.hobby = '';
		$scope.favoriteMusic = '';
		$scope.operationInProgress = false;

		if($scope.edit){
			VideosServices.updateVideos(newItem);
		}else{
			$scope.videos.push(newItem);
			VideosServices.createVideos(newItem);
		}
	}

	$scope.removeItem = function removeItem(row, id) {
	    var index = $scope.videos.indexOf(row);
	        
	    if (index !== -1) {
	        $scope.videos.splice(index, 1);
	        VideosServices.removeVideos(id);
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