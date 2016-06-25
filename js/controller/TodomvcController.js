/**
 * 콘트롤러
 */
angular.module('todomvc').controller('TodomvcCtrl', function ($scope) {
    $scope.todos = [
        {
            id: 1,
            title: 'code Lab',
            completed: true
        },
        {
            id: 2,
            title: 'study',
            completed: false
        },
        {
            id: 3,
            title: '수영',
            completed: true
        }
    ];

    $scope.remove = function (todo) {
        // find index
        var index = $scope.todos.findIndex(function (t) {
            return t.id === todo.id;
        });

        // remove
        if (index > -1) {
            $scope.todos.splice(index, 1);
        }
    };

    $scope.add = function (newTodoTitle) {
        var todos = $scope.todos;
        var newTodoId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
        todos.push({
            id: newTodoId,
            title: newTodoTitle,
            completed: false
        });

        $scope.newTodoTitle = '';
    };

    $scope.clearCompleted = function () {
        var incompletedTodos = $scope.todos.filter(function (t) {
            return t.completed === false;
        });

        angular.copy(incompletedTodos, $scope.todos);
    };
});