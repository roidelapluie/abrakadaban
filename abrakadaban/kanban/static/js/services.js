angular.module('KanbanServices', ['ngResource']).
    factory('Workspace', function($resource){
  return $resource(KanbanUrls['workspace_list'] + '/:workspaceId', {}, {
    query: {method:'GET', params:{workspaceId:'all'}, isArray:true},
    get: {method:'GET', params:{workspaceId:'all'}, isArray:true}
  });
});

