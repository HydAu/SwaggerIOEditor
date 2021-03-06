'use strict';

SwaggerEditor.controller('PasteJSONCtrl', function PasteJSONCtrl($scope,
  $modalInstance, $rootScope, $state, Storage, YAML, SwayWorker) {

  var json;

  $scope.checkJSON = function (newJson) {
    $scope.canImport = false;

    try {
      json = JSON.parse(newJson);
    } catch (error) {
      $scope.error = error.message;
      $scope.canImport = false;
      return;
    }

    SwayWorker.run(json, function (data) {
      $scope.canImport = true;
      $scope.error = null;

      if (data.errors.length) {
        $scope.error = data.errors[0];
      }

      $scope.$digest();
    });
  };

  $scope.ok = function () {
    YAML.dump(json, function (error, result) {
      Storage.save('yaml', result);
      $rootScope.editorValue = result;
      $state.go('home', {tags: null});
      $modalInstance.close();
    });
  };

  $scope.cancel = $modalInstance.close;
});
