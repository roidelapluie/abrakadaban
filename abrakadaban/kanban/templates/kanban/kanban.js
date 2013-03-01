var KanBanModule = angular.module('KanBan', []).
    config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('{&');
        $interpolateProvider.endSymbol('&}');
    }
);
KanBanModule.value('test', '123');

function WorkspaceListCtrl($scope, $http){
    $http.get('{% url "kanban:workspacejson" %}').success(function(data) {
        $scope.workspaces = data;
    })
}
