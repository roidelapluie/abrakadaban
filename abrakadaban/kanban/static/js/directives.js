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
                e.dataTransfer.setData('text', $scope.idea);
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
            console.log(attr.dragOrder);
            console.log(attr.dragWorkflow);
            elem.bind('drop', function(e){
                if (e.stopPropagation) {
                    e.stopPropagation();
                }
                if (e.preventDefault) {
                    e.preventDefault();
                }
                console.log('idea:' + e.dataTransfer.getData('text'));
                e.dataTransfer.getData('text').order=attr.dragOrder;
                $scope.$update();
                console.log('workflow:' + attr.dragWorkflow);
                console.log('order:' + attr.dragOrder);
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

