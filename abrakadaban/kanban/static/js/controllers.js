function WorkspaceListCtrl($scope, Workspace){
    workspaces = Workspace.query({},
        function(){
            $scope.workspaces = workspaces['objects'];
        }
        );
}

function UserCtrl($scope, $location, User, Auth){
    user = User.query(
        function(){
            $scope.user = user['objects'][0];
        }
    );
    $scope.username = "";
    $scope.login = function(){
        user = Auth.login(postData={'action':'login', 'password': $scope.password,'username': $scope.username},
            function(){
                newuser = User.query(function(){
                    $scope.user = newuser['objects'][0];
                })
                $scope.password = "";
                $scope.error = "";
                $location.path("/");
            },
            function(data){
                $scope.error = data['data']['error'];
                $scope.password = "";
            }
        );
    };
    $scope.logout = function(){
        user = Auth.logout(postData={'action':'logout'},
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
            $scope.workspace = workspace;
            $scope.workspaceWidth = Math.floor(12/$scope.workspace.workflow.length);
        }
    );
    $scope.updateIdea = function(idea){
        Idea.update({'ideaId': idea.id}, postData=idea)
    }
    //$scope.changeIdeaOrder = function(idea, order){
    //    Idea.reorder({'workspaceId': $routeParams.workspaceId}, postData={'action':'reorder', 'idea': idea, 'order': order})
    //}
    //$scope.changeIdeaOrderAndWorkflow = function(idea, workflow, order){
    //    $scope.ideas = Idea.update({'workspaceId': $routeParams.workspaceId}, postData={'action':'update', 'idea': idea, 'workflow': workflow, 'order': order})
    //}
    $scope.createnewidea = function(ideatitle, workflow_id, workspace_id){
        Idea.create(postData={title: ideatitle, workflow: workflow_id, workspace: workspace_id});
    }
    $scope.orderProp = "order";
    $scope.dragguable = true;
}
