angular.module('KanbanDirectives', []).
directive('draggableIdea', function(){ 
    return {
        restrict: 'A', //attribute only
        link: function($scope, elem) {
            elem.bind('dragend', function(e){
                e.stopPropagation();
                //$scope.stopDragAndDrop();
                //$scope.$apply()
            });
            elem.bind('dragstart', function(e){
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text', $scope.idea.id);
                //$scope.startDragAndDrop();
                //$scope.$apply()
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
                this.classList.remove('activeDrag');
                for (var i=0; i<$scope.workspace.idea.length; i++){
                    console.log(i);
                    if ($scope.workspace.idea[i]['id'] == idea){
                        $scope.workspace.idea[i]['order'] = attr.dragOrder;
                        console.log($scope.workspace.idea[i]['workflow']);
                        $scope.workspace.idea[i]['workflow'] = JSON.parse(attr.dragWorkflow);
                        console.log();
                    }
                }
                $scope.$apply();
                //$scope.changeIdeaOrderAndWorkflow(idea, attr.dragWorkflow, attr.dragOrder)
                //$scope.stopDragAndDrop();
                //$scope.$apply();
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

