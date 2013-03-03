angular.module('KanbanFilters', []).
    filter('workflow', function(){
        return function(items, workflow_id){
            var CorresponingIdea=[];
            angular.forEach(items, function(item){
                if (item.workflow == workflow_id){
                    CorresponingIdea.push(item);
                }
            });
            return CorresponingIdea;
        }
}).
    filter('hardenOrder', function(){
        return function(items){
            var CorresponingIdea=[];
            var i=2;
            angular.forEach(items, function(item){
                item.order = i;
                i+=2;
                CorresponingIdea.push(item);
            });
            return CorresponingIdea;
        }
});

