angular.module('KanbanFilters', []).
    filter('workflow', function(Idea){
        return function(items, workflow_id){
            var CorresponingIdea=[];
            var i = 2;
            angular.forEach(items, function(item){
                if (item.workflow.id == workflow_id){
                    if(item.order != i){
                        item.order = i;
                        Idea.update({'ideaId': item.id}, postData=item);
                    }
                    i+=2;
                    CorresponingIdea.push(item);
                }
            });
            return CorresponingIdea;
        }
}).
    filter('workspaceShown', function(){
        return function(workspaces, shown){
            var CorresponingWorkspace=[];
            angular.forEach(workspaces, function(workspace){
                if(workspace.shown == shown){
                    CorresponingWorkspace.push(workspace);
                }
            });
            return CorresponingWorkspace;
        }
});

