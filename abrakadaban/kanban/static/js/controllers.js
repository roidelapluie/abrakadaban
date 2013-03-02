function WorkspaceListCtrl($scope, Workspace){
    $scope.workspaces = Workspace.query();
}

function UserCtrl($scope, User){
    user = User.query(
        function(){
            $scope.user = user[0];
        }
    );
}

function WorkspaceViewCtrl($scope, $routeParams, Workspace, Workflow){
    var workspace = Workspace.query({'workspaceId': $routeParams.workspaceId},
        function(){
            $scope.workspace = workspace[0];
            $scope.workspaceWidth = Math.floor(12/$scope.workspace.workflow.length);
            $scope.workflows = Workflow.query({'workspaceId': $routeParams.workspaceId});
        }
    );
    $scope.orderProp = "order";
}
