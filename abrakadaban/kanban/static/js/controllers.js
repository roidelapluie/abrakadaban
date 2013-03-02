function WorkspaceListCtrl($scope, Workspace){
    $scope.workspaces = Workspace.query();
}

function UserCtrl($scope, User){
    user = User.query(
        function(){
            $scope.user = user[0];
        }
    );
    $scope.username = "";
    $scope.login = function(){
        user = User.login(postData={'action':'login', 'password': $scope.password,'username': $scope.username},
            function(){
                $scope.user = user[0];
                $scope.password = "";
                $scope.errorStyle = {};
            },
            function(){
                $scope.errorStyle = {border:'1px solid red', color: 'red'};
            }
        );
    };
    $scope.logout = function(){
        user = User.logout(postData={'action':'logout'},
            function(){
                $scope.user = null;
            }
        );
    };
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
