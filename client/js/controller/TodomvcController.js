/**
 * 콘트롤러
 */
angular.module('todomvc').controller('TodomvcCtrl', function ($scope, todoStorage) {
    $scope.remove = function (todo) {
        todoStorage.destroy(todo);
    };

    $scope.add = function (newTodoTitle) {
        newTodoTitle = newTodoTitle.trim();
        if (newTodoTitle === '')return;
        todoStorage.post(newTodoTitle);
        $scope.newTodoTitle = '';
    };

    $scope.clearCompleted = function () {
        todoStorage.destroyCompleted();
    };

    todoStorage.get(function (data) {
        $scope.todos = data;
    });

    $scope.put = function (id, title) {
        todoStorage.put(id, title);
    };
});