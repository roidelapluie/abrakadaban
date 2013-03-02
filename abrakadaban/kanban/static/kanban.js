var KanBanModule = angular.module('KanBan', []).
    config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('{&');
        $interpolateProvider.endSymbol('&}');
    }
).config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/workspaces', {templateUrl: KanbanUrls['template_workspace_list'], controller: WorkspaceListCtrl}).
        when('/workspace/:workspaceId', {templateUrl: KanbanUrls['template_workspace_view'], controller: WorkspaceViewCtrl}).
    otherwise({redirectTo: '/workspaces'});
}]);

function WorkspaceListCtrl($scope, $http){
    $http.get(KanbanUrls['workspace_list']).success(function(data) {
        $scope.workspaces = data;
    })
}
function WorkspaceViewCtrl($scope, $routeParams, $http){
    $http.get(KanbanUrls['workspace_list'] + '/' + $routeParams.workspaceId).success(function(data) {
        $scope.workspace = data;
        $scope.workspaceWidth = Math.floor(12/$scope.workspace.workflows.length);
        $scope.orderProp = "order";
    })
}
