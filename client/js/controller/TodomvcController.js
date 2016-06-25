/**
 * 콘트롤러
 */
angular.module('todomvc').controller('TodomvcCtrl', function ($scope, todoStorage) {
    /**
     * 제거
     * @param todo
     */
    $scope.remove = function (todo) {
        todoStorage.destroy(todo);
    };

    /**
     * 추가
     * @param newTodoTitle
     */
    $scope.add = function (newTodoTitle) {
        newTodoTitle = newTodoTitle.trim();
        if (newTodoTitle === '')return;
        todoStorage.post(newTodoTitle);
        $scope.newTodoTitle = '';
    };

    /**
     * 완료된 것들 삭제
     */
    $scope.clearCompleted = function () {
        todoStorage.destroyCompleted();
    };

    /**
     * 조회
     */
    todoStorage.get(function (data) {
        $scope.todos = data;
    });

    /**
     * 수정
     * @param id
     * @param title
     */
    $scope.put = function (id, title) {
        todoStorage.put(id, title);
    };
});