/**
 * 콘트롤러
 */
angular.module('todomvc').controller('TodomvcCtrl', function ($scope, todoStorage) {
    /**
     * 제거
     * @param todo
     */
    $scope.remove = function (todo) {
        todoStorage.destroy(todo, function (data) {
            console.log(data);
            $scope.todos = data;
        });
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
     * @param todo
     */
    $scope.put = function (todo) {
        todoStorage.put(todo);
    };
});