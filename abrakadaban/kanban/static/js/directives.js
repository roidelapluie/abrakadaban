angular.module('KanbanDirectives', []).
directive('draggableIdea', function(){ 
    return {
        restrict: 'A', //attribute only
//        transclude: true,
        scope: {
           'idea': '=',
           'first': '@',
           'last': '@',
//           'ideas': '=',
//           'workflows': '=',
//           'workflow': '=',
//           'draginprogress': '=',
       },
        link: function($scope, elem, Idea) {
            console.log($scope.toSource());
            elem.bind('dragstart', function(e) {
                console.log($scope.draginprogress);
                $scope.draginprogress = true;
                console.log('CHANGED');
                console.log($scope.draginprogress);
            });
        }
    };
});

