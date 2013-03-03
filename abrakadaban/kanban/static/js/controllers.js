function WorkspaceListCtrl($scope, Workspace){
    $scope.workspaces = Workspace.query();
}

function UserCtrl($scope, $location, User){
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
                $location.path("/");
            },
            function(){
                $scope.password = "";
                $scope.errorStyle = {border:'1px solid red', color: 'red'};
            }
        );
    };
    $scope.logout = function(){
        user = User.logout(postData={'action':'logout'},
            function(){
                $scope.user = null;
                $location.path("/");
            }
        );
    };
}

function WorkspaceViewCtrl($scope, $routeParams, Workspace, Workflow, Idea){
    var workspace = Workspace.query({'workspaceId': $routeParams.workspaceId},
        function(){
            $scope.workspace = workspace[0];
            $scope.workspaceWidth = Math.floor(12/$scope.workspace.workflow.length);
            $scope.workflows = Workflow.query({'workspaceId': $routeParams.workspaceId});
            $scope.ideas = Idea.query({'workspaceId': $routeParams.workspaceId});
        }
    );
    $scope.upgradeIdeas = function(idea){
        Idea.reorder({'workspaceId': $routeParams.workspaceId}, postData={'action':'upgrade', 'data': idea})
    }
    $scope.changeIdeaOrder = function(idea, order){
        Idea.reorder({'workspaceId': $routeParams.workspaceId}, postData={'action':'reorder', 'idea': idea, 'order': order})
    }
    $scope.changeIdeaOrderAndWorkflow = function(idea, workflow, order){
        $scope.ideas = Idea.update({'workspaceId': $routeParams.workspaceId}, postData={'action':'update', 'idea': idea, 'workflow': workflow, 'order': order})
    }
    $scope.stopDragAndDrop = function(){
        $scope.draginprogress = false;
    };
    $scope.startDragAndDrop = function(){
        $scope.draginprogress = true;
    };
    $scope.orderProp = "order";
    $scope.draginprogress = false;
}
