angular.module("todomvc").factory('todoStorage', function ($http) {
    var storage = {
        destroyCompleted: function () {
            var incompletedTodos = storage.todos.filter(function (t) {
                return t.completed === false;
            });

            angular.copy(incompletedTodos, storage.todos);
        },
        destroy: function (todo) {
            // find index
            var index = storage.todos.findIndex(function (t) {
                return t.id === todo.id;
            });

            // remove
            if (index > -1) {
                storage.todos.splice(index, 1);
            }
        },
        post: function (newTodoTitle) {
            var todos = storage.todos;
            var newTodoId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
            todos.push({
                id: newTodoId,
                title: newTodoTitle,
                completed: false
            });
        },
        get: function (callback) {
            $http.get('/api/todos').then(function success(response) {
                callback(response.data);
            });
            return storage.todos;
        },
        todos: []
    };

    return storage;
});