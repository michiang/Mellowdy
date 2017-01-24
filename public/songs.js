var youtunes = angular.module('youtunes', []);

function mainController($scope, $http) {
  $scope.formData = {};

    // when landing on the page, get all songs and show them
    $http.get('/api/list')
        .success(function(data) {
            $scope.list = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createSong = function() {
        $http.post('/api/list', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                // clear the form so our user is ready to enter another
                $scope.list = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.deleteSong = function(id) {
        $http.delete('/api/list/' + id)
            .success(function(data) {
                $scope.list = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };



}

