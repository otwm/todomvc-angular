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
});