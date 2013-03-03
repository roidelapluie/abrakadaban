angular.module('KanbanDirectives', []).
directive('draggableIdea', function(){ 
    return {
        restrict: 'A', //attribute only
        link: function($scope, elem) {
            elem.bind('dragend', function(e){
                e.stopPropagation();
                $scope.stopDragAndDrop();
                $scope.$apply()
            });
            elem.bind('dragstart', function(e){
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text', $scope.idea.id);
                $scope.startDragAndDrop();
                $scope.$apply()
            });
        }
    };
}).
directive('draggableDest', function(){ 
    return {
        restrict: 'A', //attribute only
        link: function($scope, elem, attr) {
            elem.bind('drop', function(e){
                if (e.stopPropagation) {
                    e.stopPropagation();
                }
                if (e.preventDefault) {
                    e.preventDefault();
                }
                var idea = e.dataTransfer.getData('text');
                $scope.changeIdeaOrderAndWorkflow(idea, attr.dragWorkflow, attr.dragOrder)
                $scope.$apply();
                $scope.startDragAndDrop();
                $scope.$apply()
                this.classList.remove('activeDrag');
                return false;
            });
            elem.bind('dragover', function(e){
                if (e.preventDefault) {
                    e.preventDefault();
                }
                e.dataTransfer.dropEffect = 'move';
                return false;
            });
            elem.bind('dragenter', function(e){
                this.classList.add('activeDrag');
            });
            elem.bind('dragleave', function(e){
                this.classList.remove('activeDrag');
            });
        }
    };
});

