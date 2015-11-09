

var data;
var baseUrl = 'https://api.spotify.com/v1/search?type=track&query='
var myApp = angular.module('myApp', ['firebase'])



var myCtrl = myApp.controller('myCtrl', function($scope, $http, $firebaseAuth, $firebaseArray, $firebaseObject) {

  var ref = new Firebase('https://spotify-cl.firebaseio.com/');
  // var artistRef = ref.child('artist');


  // $scope.artists = $firebaseArray(artistRef);

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

  
ref.on("value", function(snapshot) {
  $scope.returnedData = snapshot.val();
  console.log(snapshot.val());
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

  // ref.on('value', function(snapshot){
  //   $scope.returnedData = snapshot.val();
  //   console.log("blah: " + snapshot.key);
  // })

})


// Add tool tips to anything with a title property
$('body').tooltip({
    selector: '[title]'
});

