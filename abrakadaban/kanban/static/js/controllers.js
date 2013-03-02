function WorkspaceListCtrl($scope, $http){
    $http.get(KanbanUrls['workspace_list']).success(function(data) {
        $scope.workspaces = data;
    })
}

function WorkspaceViewCtrl($scope, $routeParams, $http){
    $http.get(KanbanUrls['workspace_list'] + '/' + $routeParams.workspaceId).success(function(data) {
        $scope.workspace = data[0];
        $scope.workspaceWidth = Math.floor(12/$scope.workspace.workflows.length);
        $scope.orderProp = "order";
    })
}
