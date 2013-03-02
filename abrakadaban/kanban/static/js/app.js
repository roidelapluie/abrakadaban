var KanBanModule = angular.module('KanBan', []).
    config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('{&');
        $interpolateProvider.endSymbol('&}');
    }
).config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/workspaces', {templateUrl: KanbanUrls['template_workspace_list'], controller: WorkspaceListCtrl}).
        when('/workspace/:workspaceId', {templateUrl: KanbanUrls['template_workspace_view'], controller: WorkspaceViewCtrl}).
    otherwise({redirectTo: '/workspaces'});
}]);
