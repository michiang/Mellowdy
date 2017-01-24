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

    // Delete a song when you click on the text
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

     $scope.search = function (isNewQuery) {
      $scope.loading = true;
      return $http.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          key: 'AIzaSyAaVxe2e6AbU3FD2pKTQh1_AySRHC1NY8I',
          type: 'video',
          maxResults: '1',
          pageToken: isNewQuery ? '' : $scope.nextPageToken,
          part: 'id,snippet',
          fields: 'items/id,items/snippet/title,items/snippet/description,items/snippet/thumbnails/default,items/snippet/channelTitle,nextPageToken',
          q: this.query
        }
      })
      .success( function (data) {
        if (data.items.length === 0) {
          console.log('No results were found!');
        }
        results.push(data);
        return results;
      })
      .error( function (e) {
        console.log("error");
      });
    };

}






