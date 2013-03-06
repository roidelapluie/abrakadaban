var KanBanModule = angular.module('KanBan', ['KanbanServices', 'KanbanFilters', 'KanbanDirectives']).
    config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('{&');
        $interpolateProvider.endSymbol('&}');
    })
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/workspaces', {templateUrl: KanbanUrls['template_workspace_list'], controller: WorkspaceListCtrl}).
        when('/workspace/:workspaceId', {templateUrl: KanbanUrls['template_workspace_view'], controller: WorkspaceViewCtrl}).
        otherwise({redirectTo: '/workspaces'});
    }])
.config(function($httpProvider) {
     $httpProvider.defaults.headers.put['Content-Type'] = 'application/json';
     $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
})
;
