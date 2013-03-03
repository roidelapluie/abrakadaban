angular.module('KanbanDirectives', []).
directive('draggableIdea', function(){ 
    return {
        restrict: 'A', //attribute only
        link: function($scope, elem, Idea) {
            //$scope.startDragAndDrop();
            elem.bind('dragend', function(e){
                e.stopPropagation();
                $scope.stopDragAndDrop();
                $scope.$apply()
            });
            elem.bind('dragstart', function(e){
                e.dataTransfer.setData('Text','');
                $scope.startDragAndDrop();
                $scope.$apply()
            });
        }
    };
});

