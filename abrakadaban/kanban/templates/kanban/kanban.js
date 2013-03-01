var KanBanModule = angular.module('KanBan', []).
    config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('{&');
        $interpolateProvider.endSymbol('&}');
    }
).config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/workspaces', {templateUrl: '{% url "kanban:workspacelist" %}',   controller: WorkspaceListCtrl}).
        when('/workspace/:workspaceId', {templateUrl: '{% url "kanban:workspaceview" %}', controller: WorkspaceViewCtrl}).
    otherwise({redirectTo: '/workspaces'});
}]);

function WorkspaceListCtrl($scope, $http){
    $http.get('{% url "kanban:workspacesjson" %}').success(function(data) {
        $scope.workspaces = data;
    })
}
function WorkspaceViewCtrl($scope, $routeParams, $http){
    $http.get('{% url "kanban:workspacejson" %}/' + $routeParams.workspaceId).success(function(data) {
        $scope.workspace = data;
        $scope.workspaceWidth = Math.floor(12/$scope.workspace.workflows.length);
        $scope.orderProp = "order";
    })
}
