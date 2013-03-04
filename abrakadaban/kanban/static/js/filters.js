angular.module('KanbanFilters', []).
    filter('workflow', function(){
        return function(items, workflow_id){
            var CorresponingIdea=[];
            angular.forEach(items, function(item){
                if (item.workflow.id == workflow_id){
                    CorresponingIdea.push(item);
                }
            });
            return CorresponingIdea;
        }
}).
    filter('hardenOrder', function(Idea){
        return function(items){
            var CorresponingIdea=[];
            var i=2;
            angular.forEach(items, function(item){
                if(item.order != i){
                item.order = i;
                Idea.reorder({'workspaceId': item.workspace}, postData={action:'reorder','idea':item.id, 'order':item.order});
                }
                i+=2;
                CorresponingIdea.push(item);
            });
            return CorresponingIdea;
        }
});

