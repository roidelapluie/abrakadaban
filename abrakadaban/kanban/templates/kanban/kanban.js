var KanBanModule = angular.module('KanBan', []).
    config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('{&');
        $interpolateProvider.endSymbol('&}');
    }
).config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/workspaces', {templateUrl: '{% url "kanban:workspacelist" %}',   controller: WorkspaceListCtrl}).
        when('/workspaces/:workspaceId', {templateUrl: '{% url "kanban:workspaceview" %}', controller: WorkspaceViewCtrl}).
    otherwise({redirectTo: '/workspaces'});
}]);

function WorkspaceListCtrl($scope, $http){
    $http.get('{% url "kanban:workspacejson" %}').success(function(data) {
        $scope.workspaces = data;
    })
}
function WorkspaceViewCtrl($scope, $http){
    $http.get('{% url "kanban:workspacejson" %}').success(function(data) {
        $scope.workspaces = data;
    })
}
