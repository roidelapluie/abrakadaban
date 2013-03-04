angular.module('KanbanServices', ['ngResource']).
    factory('Workspace', function($resource){
        return $resource(KanbanApiUrl + 'workspace/:workspaceId?format=json', {}, {
            query: {method:'GET', params:{workspaceId:''}, isArray:false},
              get: {method:'GET', params:{workspaceId:''}, isArray:true}
        });
}).
    factory('Workflow', function($resource){
        return $resource(KanbanApiUrl + 'workflow/:workflowId/?format=json', {}, {
            query: {method:'GET', params:{workflowId:''}, isArray:true},
              get: {method:'GET', params:{workflowId:''}, isArray:true}
        });
}).
    factory('User', function($resource){
        return $resource(KanbanApiUrl + 'user/?format=json', {}, {
            query: {method:'GET', isArray:true},
            login: {method:'POST', isArray:true},
            logout: {method:'POST', isArray:true}
        });
}).
    factory('Idea', function($resource){
        return $resource(KanbanApiUrl + 'idea/:ideaId?format=json', {}, {
            query: {method:'GET', params:{ideaId:''}, isArray:true},
            update: {method:'POST', params:{ideaId:''}, isArray:true},
            upgrade: {method:'POST', params:{ideaId:''}, isArray:true},
            reorder: {method:'POST', params:{ideaId:''}, isArray:true},
        });
});

