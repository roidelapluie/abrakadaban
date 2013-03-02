angular.module('KanbanFilters', []).
    filter('workflow', function(){
        return function(items, workflow_id){
            var CorresponingIdea=[];
            console.log(items);
            angular.forEach(items, function(item){
                if (item.workflow == workflow_id){
                    CorresponingIdea.push(item);
                }
            });
            return CorresponingIdea;
        }
});

