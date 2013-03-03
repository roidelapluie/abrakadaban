angular.module('KanbanServices', ['ngResource']).
    factory('Workspace', function($resource){
        return $resource(KanbanUrls['workspace_list'] + '/:workspaceId', {}, {
            query: {method:'GET', params:{workspaceId:'all'}, isArray:true},
              get: {method:'GET', params:{workspaceId:'all'}, isArray:true}
        });
}).
    factory('Workflow', function($resource){
        return $resource(KanbanUrls['workflow_list'] + '/:workspaceId', {}, {
            query: {method:'GET', params:{workspaceId:'all'}, isArray:true},
              get: {method:'GET', params:{workspaceId:'all'}, isArray:true}
        });
}).
    factory('User', function($resource){
        return $resource(KanbanUrls['user_info'], {}, {
            query: {method:'GET', isArray:true},
            login: {method:'POST', isArray:true},
            logout: {method:'POST', isArray:true}
        });
}).
    factory('Idea', function($resource){
        return $resource(KanbanUrls['idea_list'] + '/:workspaceId', {}, {
            query: {method:'GET', params:{workspaceId:'all'}, isArray:true},
            update: {method:'POST', params:{workspaceId:'all'}, isArray:true},
        });
});

