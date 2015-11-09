
var baseUrl = 'https://api.spotify.com/v1/search?type=track&query='

// Initiate app
var myApp = angular.module('myApp', ['firebase'])


// Initiate controller
var myCtrl = myApp.controller('myCtrl', function($scope, $http, $firebaseAuth, $firebaseArray, $firebaseObject) {

  var ref = new Firebase('https://spotify-cl.firebaseio.com/');

  $scope.audioObject = {}

  $scope.getSongs = function(track) {
    ref.push({'query': track})

//upload to firebase. 

  $scope.list = function() {
    $scope.artist.$add({
      text: track
    })

    .then(function() {
      $scope.artist = ''
    })
  }

    $http.get(baseUrl + $scope.track).success(function(response){
      $scope.tracks = response.tracks.items;      
    })
  }
  
  // Function for playing and pausing music
  $scope.play = function(song) {
    if($scope.currentSong == song) {
      $scope.audioObject.pause()
      $scope.currentSong = false
      return
    }
    else {
      if($scope.audioObject.pause != undefined) $scope.audioObject.pause()
      $scope.audioObject = new Audio(song);
      $scope.audioObject.play()  
      $scope.currentSong = song
    }
  }

// Pulling data from firebase
ref.on("value", function(snapshot) {
  $scope.returnedData = snapshot.val();
  console.log(snapshot.val());
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});


})

